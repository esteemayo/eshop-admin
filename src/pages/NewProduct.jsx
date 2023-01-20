import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import app from '../firebase';
import { addProduct } from 'redux/products/productSlice';

const initialState = {
  title: '',
  price: '',
  desc: '',
  inStock: true,
};

const NewProduct = () => {
  const dispatch = useDispatch();
  const titleInputRef = useRef();
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState(initialState);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues({ ...values, [name]: value });
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const fileName = new Date().getTime() + file.name;

    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const newProduct = {
            ...values,
            size,
            color,
            categories,
            img: downloadURL,
          };

          dispatch(addProduct({ product: newProduct, toast }));

          setSize([]);
          setColor([]);
          setFile(null);
          setCategories([]);
          setValues({ title: '', price: '', desc: '', inStock: true });
        });
      }
    );
  };

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
            ref={titleInputRef}
            value={values.title}
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
            value={values.desc}
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
            value={values.price}
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
            value={values.inStock}
            onChange={handleChange}
          >
            <Option value='true'>Yes</Option>
            <Option value='false'>No</Option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='file'>Image</Label>
          <Input
            id='file'
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
        </FormGroup>
        <Button>Create</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
  padding: 2rem;
  font-size: 1.5rem;
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
  color: gray;
`;

const Input = styled.input`
  display: block;
  width: 30rem;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-family: inherit;
  color: #999;
  caret-color: #00008b;
  border: 1px solid gray;
  border-radius: 3px;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
    -webkit-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    -moz-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  }

  &::-webkit-input-placeholder {
    color: #bbb;
  }
`;

const Select = styled.select`
  display: block;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-family: inherit;
  color: #999;
  width: 30rem;
  border: 1px solid gray;
  border-radius: 3px;
  user-select: none;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:focus {
    -webkit-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    -moz-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  }
`;

const Option = styled.option``;

const Button = styled.button`
  border: none;
  display: block;
  padding: 1rem 2rem;
  text-transform: capitalize;
  background-color: #00008b;
  color: var(--color-white);
  border-radius: 0.5rem;
  margin-top: 2rem;
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: translate(3px);
  }

  &:focus {
    outline: none;
  }
`;

export default NewProduct;
