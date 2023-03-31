import React from "react";
import styled from "@emotion/styled";
import axios from "axios";
import DiagonalImg from "../../../public/greyDiagonal.png"
import Image from "next/image";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import DropDown from "../../components/DropDown";


const Page = styled.div`
  position: absolute;
  height: 1180px;
  width: 390px;
  background-color: #1E1E1E;
  margin:0;
`;

/* HEADER */
const Header = styled.div`
height: 180px;
background-color: #EFEFEF;
box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3);
width: 390px;
`;
const GreyDiagonal = styled(Image)`
float: right;
`;
const PageTitle = styled.h1`
position: absolute;
font-size: 20px;
font-weight: 600;
margin-top: 60px;
margin-left: 35px;
color: #3A3B3C;
`;
const CreateIcon = styled(IoCreateOutline)`
position: absolute;
margin-left: 315px;
margin-top: 20px;
width: 34px;
height: 34px;
color: #EFEFEF;
`;
const CreateBtn = styled.button`
position:absolute;
margin-left: 115px;
margin-top: 325px;
width:162px;
height: 36px;
border-radius: 5px;
font-weight: 600;
color: #3A3B3C;
background-color: #EFEFEF;
`;


/* INPUTS */
const InputContainer = styled.div`
display: flex;
flex-direction: column;
width: 300px;
height: 550px;
margin-left:35px;
margin-top: 35px;
`;
const NameContainer = styled.div`
margin-bottom: 23px;
`;
const NameLbl = styled.p`
color: #EFEFEF;
margin-bottom: 11px;
`;
const NameInput = styled.input`
width: 279px;
height: 24px;
background-color: transparent;
border: 1px solid #FFFFFF;
border-radius: 5px;
color: #EFEFEF;
`;
const RentalTypeContainer = styled.div`
margin-bottom: 23px;
`;
const RentalTypeLbl = styled.p`
color: #EFEFEF;
margin-bottom: 11px;
`;
const RentalTypeInput = styled.input`
width: 104px;
height: 28px;
background-color: transparent;
border: 1px solid #FFFFFF;
border-radius: 5px;
color: #EFEFEF;
::placeholder {
    color: #EFEFEF;
    padding:10px;
    font-weight: 400;
  }
`;
const LocationContainer = styled.div`
margin-bottom: 23px;
`;
const LocationLbl = styled.p`
color: #EFEFEF;
margin-bottom: 11px;
`;
const LocationInput = styled.input`
width: 279px;
height: 24px;
background-color: transparent;
border: 1px solid #FFFFFF;
border-radius: 5px;
color: #EFEFEF;
`;
const DescriptionContainer = styled.div`
margin-bottom: 23px;
`;
const DescriptionLbl = styled.p`
color: #EFEFEF;
margin-bottom: 11px;
`;
const DescriptionInput = styled.input`
width: 279px;
height: 34px;
background-color: transparent;
border: 1px solid #FFFFFF;
border-radius: 5px;
color: #EFEFEF;
`;
const BrandContainer = styled.div`
margin-bottom: 23px;
`;
const BrandLbl = styled.p`
color: #EFEFEF;
margin-bottom: 11px;
`;
const BrandInput = styled.input`
width: 279px;
height: 24px;
background-color: transparent;
border: 1px solid #FFFFFF;
border-radius: 5px;
color: #EFEFEF;
`;
const MaxPplContainer = styled.div`
margin-bottom: 23px;
`;
const MaxPplLbl = styled.p`
color: #EFEFEF;
margin-bottom: 11px;
`;
const MaxPplInput = styled.input`
width: 279px;
height: 24px;
background-color: transparent;
border: 1px solid #FFFFFF;
border-radius: 5px;
color: #EFEFEF;
`;
const MaxTimeContainer = styled.div`
margin-bottom: 23px;
`;
const MaxTimeLbl = styled.p`
color: #EFEFEF;
margin-bottom: 11px;
`;
const MaxTimeInput = styled.input`
width: 279px;
height: 24px;
background-color: transparent;
border: 1px solid #FFFFFF;
border-radius: 5px;
color: #EFEFEF;
`;
const AvailableContainer = styled.div`
margin-bottom: 23px;
`;
const AvailableLbl = styled.p`
color: #EFEFEF;
margin-bottom: 11px;
`;
const AvailableInput = styled.input`
width: 104px;
height: 28px;
background-color: transparent;
border: 1px solid #FFFFFF;
border-radius: 5px;
color: #EFEFEF;
::placeholder {
    color: #EFEFEF;
    padding:10px;
    font-weight: 400;
  }
`;
const ImgContainer = styled.div`
margin-bottom: 23px;
`;
const ImgLbl = styled.p`
color: #EFEFEF;
margin-bottom: 11px;
`;
const ImgInputContainer = styled.div` 
width: 220px;
height: 70px;
background-color: transparent;
border: 1px solid #FFFFFF;
border-radius: 5px;
color: #EFEFEF;
`;
const ImgInput = styled.input`
background-color: transparent;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;

`;
const UploadIcon = styled(AiOutlineCloudUpload)`
margin-left: 100px;
margin-top: 10px;
width: 26px;
height: 26px;
color: #EFEFEF;
`;

const UploadTxt = styled.p`
text-align: center;
font-weight: 300;
font-size: 14px;
margin-top: -70px;
`;

function CreateRental() {

  /* DROPDOWN */
  const Equipment = "Equipment";
  const Hub = "Hub";
  const Event = "Event";

  const optionsRentalType = [
    { label: 'Equipment', value: 'Equipment' },
    { label: 'Hub', value: 'Hub' },
    { label: 'Event', value: 'Event' },
  ];

  /* HANDLE CREATE POST REQUEST */
  const [name, setName] = useState('');
  const [rentalType, setRentalType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [maxPpl, setMaxPpl] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [available, setAvailable] = useState('');
  const [rentalImage, setRentalImage] = useState('');
  const [rentalStatus, setRentalStatus] = useState('');



  const handleCreate = () => {
    axios.post('http://localhost:8080/hub/createHub', {
      hubName: name,
      hubLocation: location,
      hubImg: rentalImage,
      maxTimeToRent: maxTime,
      hubDescription: description,
      rentalType: rentalType,
      //rentalAvailability: available
      //brand: brand,
      //maxPpl: maxPpl,

      //available: available,

    })
      .then(response => {
        // handle success
        console.log(response);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  /* UPLOAD IMAGE */
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('rentalImage', selectedFile);
  }

  return (
    <Page>
      <Header>
        <GreyDiagonal src={DiagonalImg} />
        <PageTitle>Create Rental</PageTitle>
        <CreateIcon />
      </Header>
      <InputContainer>
        <NameContainer>
          <NameLbl>Name</NameLbl>
          <NameInput value={name} onChange={(e) => setName(e.target.value)} />
        </NameContainer>
        <RentalTypeContainer>
          <RentalTypeLbl>Rental Type</RentalTypeLbl>
          <RentalTypeInput placeholder="Select" value={rentalType} options={optionsRentalType} onChange={(e) => setRentalType(e.target.value)} />
        </RentalTypeContainer>
        <LocationContainer>
          <LocationLbl>Location</LocationLbl>
          <LocationInput value={location} onChange={(e) => setLocation(e.target.value)} />
        </LocationContainer>
        <DescriptionContainer>
          <DescriptionLbl value={description} onChange={(e) => setDescription(e.target.value)}>Description</DescriptionLbl>
          <DescriptionInput />
        </DescriptionContainer>
        <BrandContainer>
          <BrandLbl>Brand</BrandLbl>
          <BrandInput value={brand} onChange={(e) => setBrand(e.target.value)} />
        </BrandContainer>
        <MaxPplContainer>
          <MaxPplLbl value={maxPpl} onChange={(e) => setMaxPpl(e.target.value)}>Maximum Amount of People</MaxPplLbl>
          <MaxPplInput />
        </MaxPplContainer>
        <MaxTimeContainer>
          <MaxTimeLbl>Maximum Time to Rent (h)</MaxTimeLbl>
          <MaxTimeInput value={maxTime} onChange={(e) => setMaxTime(e.target.value)} />
        </MaxTimeContainer>
        <AvailableContainer>
          <AvailableLbl>Available to Rent</AvailableLbl>
          <AvailableInput placeholder="Select" value={rentalStatus} onChange={(e) => setRentalStatus(e.target.value)} />
        </AvailableContainer>
        <ImgContainer>
          <ImgLbl>Image</ImgLbl>

          <ImgInputContainer value={rentalImage} onChange={(e) => setRentalImage(e.target.value)}>
            <UploadIcon />
            <ImgInput type="file" onChange={handleFileChange} />
            <UploadTxt>
              Choose image to upload
            </UploadTxt>
          </ImgInputContainer>
        </ImgContainer>
      </InputContainer>
      <CreateBtn onClick={handleCreate}>Create</CreateBtn>
    </Page>
  )
}
export default CreateRental;