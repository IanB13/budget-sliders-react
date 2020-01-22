import React from 'react'

const Sliders =(props) =>{
    const sliderArray = props.sliders;
    const changesliders =props.changesliders; 
    const totalBudget =props.totalBudget;

      return(
        <div>
          {sliderArray.map(slider => { 
            return( <Slider 
              sliderBudget ={slider.total} 
              sliderId={slider.id} 
              key = {slider.id} // does not create a prop, needed for react rendering
              changesliders = {changesliders} 
              sliderArray = {props.sliders} 
              totalBudget ={totalBudget}/>)
            }) }
        </div>
      )
    }
 //handles changing totals and quantities based on changed slider
const totalChange = (targetObject,totalBudget,sliderArray,changesliders) =>{
  const {sliderTotal, sliderId} = targetObject
  const locked = numLocked(sliderArray);
  const totalLocked = costLocked(sliderArray)
  console.log(costLocked(sliderArray))
  const newAmount = (totalBudget-sliderTotal-totalLocked)/(sliderArray.length-1-locked)
  const newArray = sliderArray.map(slider =>{
    if(sliderId === slider.id){
      const changedSlider = {
        ...slider,
        total: sliderTotal,
        quantity: sliderTotal/slider.cost
      };
      return changedSlider
    }
    else if(slider.locked){
      const changedSlider = {
        ...slider,
      };
      return changedSlider
    }
    else{
      const changedSlider = {
        ...slider,
        total: newAmount,
        quantity: newAmount/slider.cost
      };
      return changedSlider
    }
  } )
  changesliders(newArray)
} 


//working on making changes smoother
const quantityChange = (targetObject,totalBudget,sliderArray,changesliders) =>{
  const {sliderQuantity, sliderId} = targetObject
  const sliderTotal =sliderQuantity*sliderArray[sliderId].cost ;
  const locked = numLocked(sliderArray);
  const totalLocked = costLocked(sliderArray)
  console.log(costLocked(sliderArray))
  const newAmount = (totalBudget-sliderTotal-totalLocked)/(sliderArray.length-1-locked)
  const newArray = sliderArray.map(slider =>{
    if(sliderId === slider.id){
      const changedSlider = {
        ...slider,
        total: sliderTotal,
        quantity: sliderQuantity
      };
      return changedSlider
    }
    else if(slider.locked){
      const changedSlider = {
        ...slider,
      };
      return changedSlider
    }
    else{
      const changedSlider = {
        ...slider,
        total: newAmount,
        quantity: newAmount/slider.cost
      };
      return changedSlider
    }
  } )
  changesliders(newArray)
} 


//finds how many sliders are locked in the array 
const numLocked =(sliderArray) =>{
  const locked = sliderArray.reduce((acc,curr)=>{
    if(curr.locked){
      return acc + 1
    }else{
      return acc
    }
  },0)
  console.log(`locked is ${locked}`)
  return locked;
}

// finds total cost of locked sliders
//TODO: needs update for if modifying locked slider
const costLocked =(sliderArray,targetId) =>{

  const cost = sliderArray.reduce((acc,cur) =>{
    if(cur.locked){
     return acc = +cur.total +acc;
    }
    console.log(cur.total)
    return acc
  },0)
  console.log(cost)
  return cost || 0
}

//Creates the individual sliders, 
const Slider =(props) =>{
    const changesliders = props.changesliders;
    const sliderArray = props.sliderArray;
    const sliderId = props.sliderId;
    const totalBudget = props.totalBudget; // total Budget
      
    //Handles total changes
    const handleTotalChange = (event) => {
        
        const targetObject = {sliderTotal:event.target.value , sliderId: sliderId};
        console.log(targetObject)
        totalChange(targetObject,totalBudget,sliderArray,changesliders);

      }

      //handles quantity changes
      const handleQuantityChange = (event)=>{
        const targetObject = {sliderQuantity:event.target.value, sliderId: sliderId}
        quantityChange(targetObject,totalBudget,sliderArray,changesliders);
      }


      //handles cost changes, does NOT UPDATE BUDGET
      const handleCostChange = (event)=>{
        const targetId = +event.target.id.slice(4) //takes "quantity#" string ID and gets integer 
       
        const newArray = sliderArray.map(slider =>{
            if(slider.id === targetId){
              return {...sliderArray[targetId],cost:+event.target.value}
            }
            else return slider;
        })

        changesliders(newArray)
      }

      // toggles lock based on sliderID
      const toggleLock =(event) =>{
          const lockId = event.target.id;
          const id = +lockId.slice(4)
          const lockArray = sliderArray.map(slider =>{
            if(id === +slider.id){
              return( {...slider, locked: !slider.locked})
            }else{
              return({...slider})
            }
          }
          )
          changesliders(lockArray)
      }

      
      return(
        <div>
          <input value = {sliderArray[sliderId].quantity} 
          type = "range"
          min = {0}
          step = {1}
          max = {totalBudget/sliderArray[sliderId].cost}
          id = {`slider${sliderId}`}
          onChange ={handleQuantityChange}/>
          <input value = {sliderArray[sliderId].quantity} 
            id = {`quantity${sliderId}`}
            onChange ={handleQuantityChange}
            /> quantity *
          <input value = {sliderArray[sliderId].cost} 
            id = {`cost${sliderId}`}
            onChange = {handleCostChange}
          />cost = 
        <input value = {sliderArray[sliderId].total}
          id = {`total${sliderId}`}
          onChange ={handleTotalChange} />
          total
          <input type="checkbox" 
          id = {`lock${sliderId}`}
          onChange={toggleLock}
          />
      </div>
      )
    }

export default Sliders;