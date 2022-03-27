import styled from 'styled-components';
import { phone } from 'responsive';

const NewUser = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <Title>New user</Title>
      <Form onSubmit={handleSubmit}>
        <FormContainer>
          <FormGroup>
            <FormInput type='text' placeholder='Username' required />
            <FormLabel>Username</FormLabel>
          </FormGroup>
          <FormGroup>
            <FormInput type='text' placeholder='Full Name' required />
            <FormLabel>Full Name</FormLabel>
          </FormGroup>
          <FormGroup>
            <FormInput type='email' placeholder='Email' required />
            <FormLabel>Email</FormLabel>
          </FormGroup>
          <FormGroup>
            <FormInput type='password' placeholder='Password' required />
            <FormLabel>Password</FormLabel>
          </FormGroup>
          <FormGroup>
            <FormInput
              type='password'
              placeholder='Confirm Password'
              required
            />
            <FormLabel>Confirm password</FormLabel>
          </FormGroup>
          <FormGroup>
            <FormInput type='tel' placeholder='Phone' required />
            <FormLabel>Phone</FormLabel>
          </FormGroup>
          <FormGroup>
            <FormInput type='text' placeholder='Address' required />
            <FormLabel>Address</FormLabel>
          </FormGroup>
          <FormGroup>
            <FormGroupRadio>
              <FormRadioInput
                type='radio'
                name='gender'
                id='male'
                value='Male'
              />
              <FormRadioLabel htmlFor='male'>Male</FormRadioLabel>
              <FormRadioInput
                type='radio'
                name='gender'
                id='female'
                value='Female'
              />
              <FormRadioLabel htmlFor='female'>Female</FormRadioLabel>
              <FormRadioInput
                type='radio'
                name='gender'
                id='other'
                value='Other'
              />
              <FormRadioLabel htmlFor='other'>Other</FormRadioLabel>
            </FormGroupRadio>
            <FormLabel>Gender</FormLabel>
          </FormGroup>
          <FormGroup>
            <Select name='active' id='active'>
              <Option value='yes'>Yes</Option>
              <Option value='no'>No</Option>
            </Select>
            <FormSelectLabel htmlFor='active'>Active</FormSelectLabel>
          </FormGroup>
        </FormContainer>
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

const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FormGroup = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  margin-right: 2rem;

  &:not(:last-of-type) {
    margin-bottom: 1rem;

    ${phone({ marginBottom: '0.5rem' })}
  }
`;

const FormLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  margin-left: 2rem;
  margin-top: 0.7rem;
  color: rgb(151, 150, 150);
`;

const FormSelectLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  margin-left: 2rem;
  margin-top: 0.7rem;
  color: rgb(151, 150, 150);
`;

const FormRadioLabel = styled.label`
  margin: 1rem;
  font-size: 1.8rem;
  font-weight: normal;
  color: #555;
  cursor: pointer;

  ${phone({ fontSize: '1.5rem' })}
`;

const FormInput = styled.input`
  border: none;
  width: 100%;
  padding: 1.25rem 1.75rem;
  border-top: 3px solid transparent;
  border-bottom: 3px solid #bbb;
  font-family: inherit;
  font-size: 1.4rem;
  color: #999;
  border-radius: 4px;
  caret-color: #00008b;
  transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;

  &:focus {
    outline: none;
    border-bottom: 3px solid #008080;
    -webkit-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    -moz-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  }

  &:focus:invalid {
    border-bottom: 3px solid #ffb952;
  }

  &::-webkit-input-placeholder {
    color: #bbb;
  }

  &:placeholder-shown + ${FormLabel} {
    opacity: 0;
    visibility: hidden;
    transform: translateY(4rem);
  }
`;

const FormRadioInput = styled.input`
  cursor: pointer;
`;

const FormGroupRadio = styled.div`
  margin-top: 1rem;
`;

const Select = styled.select`
  border: none;
  width: 100%;
  padding: 1.25rem 1.75rem;
  border-top: 3px solid transparent;
  border-bottom: 3px solid #bbb;
  color: #999;
  user-select: none;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
    border-bottom: 3px solid #008080;
    -webkit-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    -moz-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  }

  &:focus:invalid {
    border-bottom: 3px solid #ffb952;
  }
`;

const Option = styled.option``;

const Button = styled.button`
  border: none;
  display: block;
  width: 20rem;
  text-transform: capitalize;
  text-align: center;
  padding: 0.7rem 1rem;
  font-weight: 600;
  font-size: 1.5rem;
  background-color: #00008b;
  color: var(--color-white);
  border-radius: 1rem;
  margin-top: 3rem;
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.03);

    @media only screen and (max-width: 37.5em), only screen and (hover: none) {
      transform: none;
    }
  }

  &:focus {
    outline: none;
  }
`;

export default NewUser;
