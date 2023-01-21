import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Publish } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import app from '../firebase';
import { phone } from 'responsive';
import Chart from 'components/Chart';
import { getIncomeStats } from 'services/orderService';
import { editProduct } from 'redux/products/productSlice';

const initialState = {
  title: '',
  desc: '',
  price: '',
  inStock: true,
};

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === id)
  );

  const [perc, setPerc] = useState(0);
  const [size, setSize] = useState([]);
  const [file, setFile] = useState(null);
  const [color, setColor] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inputs, setInputs] = useState(initialState);
  const [productStats, setProductStats] = useState([]);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(','));
  };

  const handleColor = (e) => {
    setColor(e.target.value.split(','));
  };

  const handleCategories = (e) => {
    setCategories(e.target.value.split(','));
  };

  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  const fetchIncomeStats = useCallback(async () => {
    try {
      const { data } = await getIncomeStats(product?.id);

      const list = data.income.sort((a, b) => {
        return a._id - b._id;
      });

      list.map((item) =>
        setProductStats((prev) => [
          ...prev,
          { name: MONTHS[item._id - 1], Sales: item.total },
        ])
      );
    } catch (err) {
      console.log(err);
    }
  }, [MONTHS, product.id]);

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
          setInputs((prev) => ({ ...prev, img: downloadURL }));
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      ...inputs,
      size,
      color,
      categories,
    };

    dispatch(editProduct({ productId: id, product, navigate, toast }));
  };

  useEffect(() => {
    fetchIncomeStats();
  }, [fetchIncomeStats]);

  useEffect(() => {
    setSize(product.size);
    setColor(product.color);
    setCategories(product.categories);
    setInputs({
      title: product.title,
      desc: product.desc,
      price: product.price,
      inStock: product.inStock,
    });
  }, [product]);

  useEffect(() => {
    file && uploadFile(file);
  }, [file]);

  return (
    <Container>
      <TitleContainer>
        <Title>Product</Title>
        <Link to='/new-product' className='product__link'>
          <AddButton>Create</AddButton>
        </Link>
      </TitleContainer>
      <Top>
        <TopLeft>
          <Chart
            data={productStats}
            dataKey='Sales'
            title='Sales performance'
          />
        </TopLeft>
        <TopRight>
          <InfoTop>
            <Image src={product?.img} />
            <ProductName>{product.title}</ProductName>
          </InfoTop>
          <InfoBottom>
            <InfoItem>
              <InfoKey>id:</InfoKey>
              <InfoValue>{product?._id}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoKey>sales:</InfoKey>
              <InfoValue>5123</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoKey>in stock:</InfoKey>
              <InfoValue>{product?.inStock ? 'yes' : 'no'}</InfoValue>
            </InfoItem>
          </InfoBottom>
        </TopRight>
      </Top>
      <Bottom>
        <Form onSubmit={handleSubmit}>
          <FormLeft>
            <FormGroup>
              <Input
                type='text'
                name='title'
                value={inputs.title}
                onChange={handleChange}
                placeholder={product.title}
              />
              <Label>Product name</Label>
            </FormGroup>
            <FormGroup>
              <Input
                type='text'
                name='desc'
                value={inputs.desc}
                onChange={handleChange}
                placeholder={product.desc}
              />
              <Label>Product description</Label>
            </FormGroup>
            <FormGroup>
              <Input
                type='text'
                name='price'
                value={inputs.price}
                onChange={handleChange}
                placeholder={product.price}
              />
              <Label>Price</Label>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='categories'>Categories</Label>
              <Input
                type='text'
                id='categories'
                value={categories}
                placeholder='Categories'
                onChange={handleCategories}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='size'>Size</Label>
              <Input
                type='text'
                id='size'
                name='size'
                value={size}
                placeholder='Size'
                onChange={handleSize}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='color'>Color</Label>
              <Input
                type='text'
                id='color'
                name='color'
                value={color}
                placeholder='Color'
                onChange={handleColor}
              />
            </FormGroup>
            <FormGroup>
              <Select name='inStock' id='inStock' onChange={handleChange}>
                <Option disabled>In Stock</Option>
                <Option value='true'>Yes</Option>
                <Option value='false'>No</Option>
              </Select>
              <Label>In stock</Label>
            </FormGroup>
          </FormLeft>
          <FormRight>
            <FileUpload>
              <Img
                src={file ? URL.createObjectURL(file) : product.img}
                alt=''
              />
              {perc > 0 && (
                <Overlay>
                  <Progress>
                    Uploading: {perc}%
                  </Progress>
                </Overlay>
              )}
              <Label htmlFor='file'>
                <Publish style={{ fontSize: '2rem', cursor: 'pointer' }} />
              </Label>
              <Input
                id='file'
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </FileUpload>
            <Button disabled={perc > 0 && perc < 100}>
              Update
            </Button>
          </FormRight>
        </Form>
      </Bottom>
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
  padding: 2rem;
  background-color: ${({ theme }) => theme.bg};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
`;

const Title = styled.h1`
  text-transform: capitalize;
  color: ${({ theme }) => theme.textSoft};
`;

const AddButton = styled.button`
  border: none;
  display: block;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  text-transform: capitalize;
  background-color: ${({ theme }) => theme.bgBtnAdd};
  color: ${({ theme }) => theme.textAdd};
  border-radius: 0.5rem;
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: translateY(3px);
  }

  &:focus {
    outline: none;
  }
`;

const Top = styled.div`
  display: flex;

  ${phone({ flexDirection: 'column' })}
`;

const TopLeft = styled.div`
  flex: 1;
`;

const TopRight = styled.div`
  flex: 1;
  padding: 2rem;
  margin: 2rem;
  font-size: 1.5rem;
  -webkit-box-shadow: ${({ theme }) => theme.box};
  -moz-box-shadow: ${({ theme }) => theme.box};
  box-shadow: ${({ theme }) => theme.box};
`;

const InfoTop = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: block;
  object-fit: cover;
`;

const ProductName = styled.span`
  text-transform: capitalize;
  font-weight: 600;
  margin-left: 2rem;
`;

const InfoBottom = styled.div`
  margin-top: 1rem;
`;

const InfoItem = styled.div`
  width: 15rem;
  display: flex;
  justify-content: space-between;
`;

const InfoKey = styled.span``;

const InfoValue = styled.span`
  font-weight: 300;
`;

const Bottom = styled.div`
  padding: 2rem;
  margin: 2rem;
  -webkit-box-shadow: ${({ theme }) => theme.box};
  -moz-box-shadow: ${({ theme }) => theme.box};
  box-shadow: ${({ theme }) => theme.box};
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;

const FormLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  display: block;
  color: gray;
  font-size: 1.2rem;
  text-transform: capitalize;
  margin-left: 2rem;
  margin-top: 0.7rem;
`;

const Input = styled.input`
  border: none;
  display: block;
  width: 50rem;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.bgInput};
  color: #999;
  border-bottom: 3px solid ${({ theme }) => theme.borderInput};
  caret-color: #00008b;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    text-transform: capitalize;
    font-size: 1.2rem;
    color: #bbb;
  }

  &:placeholder-shown + ${Label} {
    opacity: 0;
    visibility: hidden;
    transform: translateY(4rem);
  }
`;

const Select = styled.select`
  border: none;
  width: 100%;
  display: block;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.bgInput};
  color: #999;
  user-select: none;
  border-bottom: 3px solid ${({ theme }) => theme.borderInput};
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
  }

  &:placeholder-shown + ${Label} {
    opacity: 0;
    visibility: hidden;
    transform: translateY(4rem);
  }
`;

const Option = styled.option`
  text-transform: capitalize;
`;

const FormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const FileUpload = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Img = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
  display: block;
  object-fit: cover;
  margin-right: 1rem;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 5rem;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Progress = styled.span`
  font-weight: 400;
  font-size: 1.2rem;
  color: #fff;
`;

const Button = styled.button`
  border: none;
  display: block;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.btnUpd};
  color: ${({ theme }) => theme.textUpd};
  border-radius: 0.5rem;
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    opacity: 0.8;
    transform: translateX(3px);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Product;
