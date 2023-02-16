import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import app from '../firebase';
import { addProduct, reset } from 'redux/products/productSlice';

const initialState = {
  title: '',
  price: '',
  desc: '',
  inStock: true,
};

const NewProduct = () => {
  const dispatch = useDispatch();
  const { isError, isLoading } = useSelector((state) => state.product);

  const titleRef = useRef();
  const [perc, setPerc] = useState(0);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState(initialState);

  const { title, price, desc, inStock } = values;

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategories = (e) => {
    setCategories(e.target.value.split(','));
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(','));
  };

  const handleColor = (e) => {
    setColor(e.target.value.split(','));
  };

  const uploadFile = (file) => {
    const fileName = new Date().getTime() + file.name;

    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPerc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setValues((prev) => ({ ...prev, img: downloadURL }));
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      ...values,
      size,
      color,
      categories,
    };

    dispatch(addProduct({ product: newProduct, toast }));

    setSize([]);
    setColor([]);
    setFile(null);
    setCategories([]);
    setValues(initialState);
  };

  useEffect(() => {
    file && uploadFile(file);
  }, [file, dispatch]);

  useEffect(() => {
    isError && toast.error(isError);
    return () => dispatch(reset());
  }, [isError, dispatch]);

  return (
    <Container>
      <Title>New product</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor='title'>Title</Label>
          <Input
            type='text'
            id='title'
            name='title'
            placeholder='Title'
            autoFocus
            ref={titleRef}
            value={title}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='desc'>Description</Label>
          <Input
            type='text'
            id='desc'
            name='desc'
            placeholder='Description'
            value={desc}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='price'>Price</Label>
          <Input
            type='number'
            id='price'
            name='price'
            placeholder='Price'
            value={price}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='categories'>Categories</Label>
          <Input
            type='text'
            id='categories'
            placeholder='Categories'
            value={categories}
            onChange={handleCategories}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='size'>Size</Label>
          <Input
            type='text'
            id='size'
            name='size'
            placeholder='Size'
            value={size}
            onChange={handleSize}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='color'>Color</Label>
          <Input
            type='text'
            id='color'
            name='color'
            placeholder='Color'
            value={color}
            onChange={handleColor}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='inStock'>Stock</Label>
          <Select
            id='inStock'
            name='inStock'
            value={inStock}
            onChange={handleChange}
          >
            <Option value='true'>Yes</Option>
            <Option value='false'>No</Option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='file'>Image</Label>
          {perc > 0 ? (
            `Uploading: ${perc}%`
          ) : (
            <Input
              id='file'
              type='file'
              accept='image/*'
              onChange={(e) => setFile(e.target.files[0])}
            />
          )}
        </FormGroup>
        <Button disabled={isLoading || (perc > 0 && perc < 100)}>
          Create
        </Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
  padding: 2rem;
  font-size: 1.5rem;
  background-color: ${({ theme }) => theme.bg};
`;

const Title = styled.h1`
  text-transform: capitalize;
`;

const Form = styled.form``;

const FormGroup = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }
`;

const Label = styled.label`
  text-transform: capitalize;
  font-size: 1.2rem;
  padding-left: 1rem;
  color: gray;
`;

const Input = styled.input`
  display: block;
  width: 30rem;
  padding: 1rem 2rem;
  padding-left: 1rem;
  font-size: 1.2rem;
  font-family: inherit;
  background-color: transparent;
  color: #999;
  caret-color: ${({ theme }) => theme.crInput};
  border: 1px solid gray;
  border-radius: 3px;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
    -webkit-box-shadow: ${({ theme }) => theme.box};
    -moz-box-shadow: ${({ theme }) => theme.box};
    box-shadow: ${({ theme }) => theme.box};
  }

  &::-webkit-input-placeholder {
    color: #bbb;
  }
`;

const Select = styled.select`
  display: block;
  padding: 1rem 2rem;
  padding-left: 1rem;
  font-size: 1.2rem;
  font-family: inherit;
  background-color: transparent;
  color: #999;
  width: 30rem;
  border: 1px solid gray;
  border-radius: 3px;
  user-select: none;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
    -webkit-box-shadow: ${({ theme }) => theme.box};
    -moz-box-shadow: ${({ theme }) => theme.box};
    box-shadow: ${({ theme }) => theme.box};
  }
`;

const Option = styled.option``;

const Button = styled.button`
  border: none;
  display: block;
  padding: 1rem 2rem;
  text-transform: capitalize;
  background-color: ${({ theme }) => theme.btnNew};
  color: ${({ theme }) => theme.textNew};
  border-radius: 0.5rem;
  margin-top: 2rem;
  outline-color: ${({ theme }) => theme.text};
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: translate(3px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default NewProduct;
