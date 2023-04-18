import React from "react";
import styled from "@emotion/styled";
import axios from "axios";
import DiagonalImg from "../../../../public/orangeDiagonal.png"
import Image from "next/image";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useState, useEffect } from "react";
import { IoCreateOutline } from "react-icons/io5";
import DropDown from "../../../components/DropDown";
import { useRouter } from 'next/router';


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
width: 44px;
height: 44px;
color: #EFEFEF;
`;
const SaveBtn = styled.button`
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
const SavedMessageContainer = styled.div`
width: 280px;
margin-left: 55px;
margin-top: 700px;
position: fixed;
transition: visibility 0.5s ease-in-out;
`;
const SaveMessage = styled.p`
text-align: center;
font-weight: 600;
background-color: #F8F360;
border-radius: 2px;
`;

//man ska kunna redigera utan att behöva skicka in alla fält i modellen, fixa när du löst rental modell ist för hub
function EditRental() {
  let [data, setData] = useState([])
  const router = useRouter();
  const { id } = router.query
  /* DROPDOWN */
  const Equipment = "Equipment";
  const Hub = "Hub";
  const Event = "Event";


  const optionsRentalType = [
    { label: 'Equipment', value: 'Equipment' },
    { label: 'Hub', value: 'Hub' },
    { label: 'Event', value: 'Event' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/hub/getThisHub/${id}`);
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  /* HANDLE EDIT PUT REQUEST */
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
  const [savedMessage, setSavedMessage] = useState(null);


  useEffect(() => {
    if (savedMessage) {
      setTimeout(() => {
        setSavedMessage(null);
      }, 3000);
    }
  }, [savedMessage]);

  const handleEdit = () => {
    axios.put(`http://localhost:8080/hub/editHub/${id}`, {
      hubName: name,
      hubLocation: location,
      hubImg: rentalImage,
      maxTimeToRent: maxTime,
      hubDescription: description,
      rentalType: rentalType
      //rentalAvailability: available
      //brand: brand,
      //maxPpl: maxPpl,
      //available: available,


    })
      .then(response => {
        // handle success
        console.log(response);
        setSavedMessage(`${data.hubName}. was saved`);
        setTimeout(() => {
          setSavedMessage(null);
        }, 3000);
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

  return (
    <Page>
      {data ? (
        <div>
          <SavedMessageContainer>
            {savedMessage && <SaveMessage>{savedMessage}</SaveMessage>}
          </SavedMessageContainer>
          <Header>
            <GreyDiagonal src={DiagonalImg} />
            <PageTitle>Create Rental</PageTitle>
            <CreateIcon />
          </Header>
          <InputContainer>
            <NameContainer>
              <NameLbl>Name</NameLbl>
              <NameInput value={name || data.hubName} onChange={(e) => setName(e.target.value)} />
            </NameContainer>
            <RentalTypeContainer>
              <RentalTypeLbl>Rental Type</RentalTypeLbl>
              <RentalTypeInput placeholder="Select" value={rentalType || data.rentalType} options={optionsRentalType} onChange={(e) => setRentalType(e.target.value)} />
            </RentalTypeContainer>
            <LocationContainer>
              <LocationLbl>Location</LocationLbl>
              <LocationInput value={location || data.hubLocation} onChange={(e) => setLocation(e.target.value)} />
            </LocationContainer>
            <DescriptionContainer>
              <DescriptionLbl>Description</DescriptionLbl>
              <DescriptionInput value={description || data.hubDescription} onChange={(e) => setDescription(e.target.value)} />
            </DescriptionContainer>
            <BrandContainer>
              <BrandLbl>Brand</BrandLbl>
              <BrandInput value={brand || "NaN"} onChange={(e) => setBrand(e.target.value)} />
            </BrandContainer>
            <MaxPplContainer>
              <MaxPplLbl>Maximum Amount of People</MaxPplLbl>
              <MaxPplInput value={maxPpl || "NaN"} onChange={(e) => setMaxPpl(e.target.value)} />
            </MaxPplContainer>
            <MaxTimeContainer>
              <MaxTimeLbl>Maximum Time to Rent (h)</MaxTimeLbl>
              <MaxTimeInput value={maxTime || data.maxTimeToRent} onChange={(e) => setMaxTime(e.target.value)} />
            </MaxTimeContainer>
            <AvailableContainer>
              <AvailableLbl>Available to Rent</AvailableLbl>
              <AvailableInput placeholder="Select" value={rentalStatus || data.rentalStatus} onChange={(e) => setRentalStatus(e.target.value)} />
            </AvailableContainer>
            <ImgContainer>
              <ImgLbl>Image</ImgLbl>

              <ImgInputContainer value={rentalImage || data.testImg} onChange={(e) => setRentalImage(e.target.value)}>
                <UploadIcon />
                <ImgInput type="file" onChange={handleFileChange} />
                <UploadTxt>
                  Choose image to upload
                </UploadTxt>
              </ImgInputContainer>
            </ImgContainer>
          </InputContainer>
          <SaveBtn onClick={handleEdit}>Save</SaveBtn>
        </div>
      ) : (
        <p>Loading...</p>
      )}

    </Page>
  )
}
export default EditRental;