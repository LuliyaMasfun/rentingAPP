import React from "react";
import styled from "@emotion/styled";
import axios from "axios";
import DiagonalImg from "../../../public/greyDiagonal.png"
import Image from "next/image";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useState, useEffect } from "react";
import { IoCreateOutline } from "react-icons/io5";
import DropDown from "../../components/DropDown";
import { useRouter } from 'next/router';
import AuthService from '../../services/auth.service';


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
width: 100%;
height: 134%;
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
width: 44px;
height: 44px;
color: #EFEFEF;
`;
const CreateBtn = styled.button`
position:absolute;
margin-left: 95px;
margin-top: 325px;
width:202px;
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
opacity: 0.7;
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
  opacity: 0.7;
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
opacity: 0.7;
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
height: 44px;
background-color: transparent;
border: 1px solid #FFFFFF;
border-radius: 5px;
color: #EFEFEF;
opacity: 0.7;
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
opacity: 0.7;
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
opacity: 0.7;
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
opacity: 0.7;
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
  opacity: 0.7;
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
opacity: 0.7;
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
const Select = styled.select`
width: 279px;
height: 24px;
background-color: transparent;
color: #EFEFEF;
font-size: 16px;
border: 1px solid #FFFFFF;
border-radius: 5px;
opacity: 0.7;
`;

function CreateRental() {
  const [rentalTypes, setRentalTypes] = useState([]);
  const router = useRouter();
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
  const [image, setImage] = useState('');
  const [maxAmountOfPeople, setMaxAmountOfPeople] = useState(0);
  const [maxTimeToRent, setMaxTimeToRent] = useState('');
  const [available, setAvailable] = useState('');
  const [rentalImage, setRentalImage] = useState('');
  const [rentalStatus, setRentalStatus] = useState('');
  const [hubType, setHubType] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [eventType, setEventType] = useState('');
  const [createdOn, setCreatedOn] = useState('');
  const [createdBy, setCreatedBy] = useState('');


  const hubTypes = [
    { hubType: "COWORKING" },
    { hubType: "PODCASTSTUDIO" },
    { hubType: "MUSICSTUDIO" },
    { hubType: "FILMSTUDIO" }
  ]
  const equipmentTypes = [
    { equipmentType: "CAMERA" },
    { equipmentType: "SOUND" },
    { equipmentType: "LIGHT" },
    { equipmentType: "OTHER" }
  ]
  const availableToRent = [
    { label: "Yes", value: true },
    { label: "No", value: false }
  ]

  const handleCreate = () => {
    const now = new Date().toISOString();
    setCreatedOn(now);


    // 
    // setCreatedBy(`${firstName} ${lastName}`);
    const user = AuthService.getCurrentUser();
    const userName = `${user.firstName} ${user.lastName}`;
    setCreatedBy(userName)

    const postData = {
      name: name,
      location: location,
      image: rentalImage,
      maxTimeToRent: maxTimeToRent,
      rentalType: rentalType,
      createdOn: now,
      description: description,
      createdBy: createdBy,
      available: available,
      image: image
    }
    if (equipmentType) {
      postData.equipmentType = equipmentType;
    }
    if (hubType) {
      postData.hubType = hubType;
    }
    if (maxAmountOfPeople) {
      postData.maxAmountOfPeople = maxAmountOfPeople;
    }
    if (brand) {
      postData.brand = brand;
    }


    axios.post('http://localhost:8080/rental/createRental', postData)
      .then(response => {
        // handle success
        console.log(response);
        router.push('/admin/ManageRentals');
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);


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
  useEffect(() => {
    const fetchRentalTypes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/rental/getRentalTypes");
        setRentalTypes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRentalTypes();
  }, []);
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
          <Select onChange={(e) => setRentalType(e.target.value)} value={rentalType}>
            <option value="">Select</option>
            {rentalTypes.map(rentalType => (
              <option key={rentalType} value={rentalType}>
                {rentalType}
              </option>
            ))}
          </Select>
        </RentalTypeContainer>
        {rentalType === "HUB" && (
          <RentalTypeContainer>
            <RentalTypeLbl>Hub Type</RentalTypeLbl>
            <Select onChange={(e) => setHubType(e.target.value)} value={hubType}>
              <option value="">Select</option>
              {hubTypes.map(hubTypeObj => (
                <option key={hubTypeObj.hubType} value={hubTypeObj.hubType}>
                  {hubTypeObj.hubType}
                </option>
              ))}
            </Select>
          </RentalTypeContainer>
        )}
        {rentalType === "EQUIPMENT" && (
          <RentalTypeContainer>
            <RentalTypeLbl>Equipment Type</RentalTypeLbl>
            <Select onChange={(e) => setEquipmentType(e.target.value)} value={equipmentType}>
              <option value="">Select</option>
              {equipmentTypes.map(equipmentTypeObj => (
                <option key={equipmentTypeObj.equipmentType} value={equipmentTypeObj.equipmentType}>
                  {equipmentTypeObj.equipmentType}
                </option>
              ))}
            </Select>
          </RentalTypeContainer>
        )}

        <LocationContainer>
          <LocationLbl>Location</LocationLbl>
          <LocationInput value={location} onChange={(e) => setLocation(e.target.value)} />
        </LocationContainer>
        <DescriptionContainer>
          <DescriptionLbl>Description</DescriptionLbl>
          <DescriptionInput value={description} onChange={(e) => setDescription(e.target.value)} />
        </DescriptionContainer>
        {rentalType === "EQUIPMENT" && (
          <BrandContainer>
            <BrandLbl>Brand</BrandLbl>
            <BrandInput value={brand} onChange={(e) => setBrand(e.target.value)} />
          </BrandContainer>
        )}
        {rentalType === "HUB" && (
          <MaxPplContainer>
            <MaxPplLbl>Maximum Amount of People</MaxPplLbl>
            <MaxPplInput value={maxAmountOfPeople} onChange={(e) => setMaxAmountOfPeople(e.target.value)} />
          </MaxPplContainer>
        )}
        <MaxTimeContainer>
          <MaxTimeLbl>Maximum Time to Rent (h)</MaxTimeLbl>
          <MaxTimeInput value={maxTimeToRent} onChange={(e) => setMaxTimeToRent(e.target.value)} />
        </MaxTimeContainer>

        <AvailableContainer>
          <AvailableLbl>Available to Rent</AvailableLbl>
          <Select onChange={(e) => setAvailable(e.target.options[e.target.selectedIndex].value)}
            value={available}>
            <option value="">Select</option>
            {availableToRent.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </AvailableContainer>
        <ImgContainer>
          <ImgLbl>Image</ImgLbl>
          <ImgInputContainer value={image} onChange={(e) => setImage(e.target.value)}>
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