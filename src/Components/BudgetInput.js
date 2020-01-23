import React from 'react'

const BudgetInput =({budget,changeBudget}) =>{


    const budgetUpdate = (event)=>{
      changeBudget(event.target.value)
    }
  
    return(
      <h3>
        Budget:
          <input onChange = {budgetUpdate} value ={budget} />
      </h3>
    )
}

export default BudgetInput;