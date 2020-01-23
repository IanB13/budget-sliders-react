import React,{useState} from 'react'
import AddRemoveSlider from './AddRemoveSlider'
import BudgetInput from './BudgetInput'
import Sliders from './Sliders'
import D3Container from './SliderD3/UserefTest'
// main, starts with importing dummy list

const dummylist =[
    {
      id: 0,
      total: 1000,
      cost: 50,
      quantity: 20,
      locked: false
    },{
      id: 1,
      total: 1000,
      cost: 50,
      quantity: 20,
      locked: false
    },{
      id: 2,
      total: 1000,
      cost: 50,
      quantity: 20,
      locked: false
    }
  ]




const SliderContainer =() =>{
    const [budget,changeBudget] =useState(3000) // init. state with int
    const [sliders, changeSliders] =useState(dummylist) // initalizes state with dummy list, should switch to cookies


    return (
      <div className ="SliderContainer">
          <D3Container />
          <BudgetInput budget = {budget} changeBudget = {changeBudget}/>
          <AddRemoveSlider sliders = {sliders} changeSliders = {changeSliders} />
          <Sliders sliders = {sliders} changesliders = {changeSliders} totalBudget={budget} />
      </div>
    );
  }

export default SliderContainer;