import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartAction'
import MetaData from '../MetaData'
import './Shipping.css'
import PinDropIcon from '@material-ui/icons/PinDrop'
import HomeIcon from '@material-ui/icons/Home'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import PublicIcon from '@material-ui/icons/Public'
import PhoneIcon from '@material-ui/icons/Phone'
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation'
import {Country,State} from 'country-state-city'
import { useAlert } from 'react-alert'
import CheckoutSteps from '../Cart/CheckoutSteps.js'
import {useNavigate } from 'react-router-dom'
export default function Shipping() {
    const dispatch=useDispatch();
    const alert=useAlert();
    const {shippingInfo}=useSelector((state)=>state.cart);
    
    const [address,setAddress]=useState(shippingInfo.address);
    const [city,setCity]=useState(shippingInfo.city);
    const [state,setState]=useState(shippingInfo.state);
    const [country,setCountry]=useState(shippingInfo.country);
    const [pincode,setPincode]=useState(shippingInfo.pincode);
    const [phoneNo,setPhoneNo]=useState(shippingInfo.phoneNo);
    const Navigate=useNavigate();
    const shippingSubmit=(e)=>{
      e.preventDefault();
      if(phoneNo.length<10 ||phoneNo.length>10){
        alert.error("Phone Number Should be 10 digit long");
        return;
      }
dispatch(
  saveShippingInfo({address,city,state,country,pincode,phoneNo})
  )
  Navigate('/order/confirm')
    }
    return (
    <>
    <MetaData title={"Shipping Details"}/>
    <CheckoutSteps activeSteps={0}/>
    <div className='shippingContainer'>
      <div className='shippingBox'>
        <h2 className='shippingHeading'>Shipping Details</h2>
        <form className='shippingForm' encType='multipart/form-data' onSubmit={shippingSubmit}>
<div>
  <HomeIcon/>
  <input type="text" placeholder='Address' value={address} required 
  onChange={(e)=>setAddress(e.target.value)}/>
</div>
<div>
  <LocationCityIcon/>
  <input type="text" placeholder='city' required value={city}
  onChange={(e)=>setCity(e.target.value)}/>
</div>
<div>

<PinDropIcon/>
  <input type="number" placeholder='Pin Code' required value={pincode}
  onChange={(e)=>setPincode(e.target.value)}/>
  </div>
<div>
  <PhoneIcon/>
  <input type="number" placeholder='Phone Number' required value={phoneNo}
  onChange={(e)=>setPhoneNo(e.target.value)} size="10"/>
</div>
<div>
  <PublicIcon/>
  <select required value={country} onChange={(e)=>setCountry(e.target.value)} >
<option value="">Country</option>
{Country && Country.getAllCountries().map((item)=>(
  <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
))}
  </select>
</div>
{country && (<div>
  <TransferWithinAStationIcon/>
  <select required value={state} onChange={(e)=>setState(e.target.value)} >
<option value="">State</option>
{State && State.getStatesOfCountry(country).map((item)=>(
  <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
))}

  </select>
</div>)}
<input type='submit' value="Continue" className='shippingBtn' disabled={state?false:true}/>
        </form>
      </div>
    </div>
    
    </>
  )
}
