import React, { useState,useRef, useEffect} from 'react';
import * as d3 from 'd3';

//component
/* Component */
const MyD3Component = (props) => {
    /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
    const d3Container = useRef(null);

    /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
    useEffect(
        () => { 
           // set the dimensions and margins of the graph
            const width = 450
            const height = 400
            const margin = 40

            // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
            const radius = Math.min(width, height) / 2 - margin
            
            //deletes old stuff
            d3.select(d3Container.current).selectAll("*").remove();

            const svg = d3.select(d3Container.current)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            // set the color scale
            const color = d3.scaleOrdinal()
                .domain(props.data)
                .range(["#4caf50", "#2196f3", "#7b6888", "#ffc107", "#9c27b0"])

            // Compute the position of each group on the pie:
            const pie = d3.pie()
                .value(function (d) { return d.value; })
            const data_ready = pie(d3.entries(props.data))

            // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
            svg
                .selectAll('whatever')
                .data(data_ready)
                .enter()
                .append('path')
                .attr('d', d3.arc()
                    .innerRadius(100)         // This is the size of the donut hole
                    .outerRadius(radius)
                )
                .attr('fill', function (d) { return (color(d.data.key)) })
                .attr("stroke", "black")
                .style("stroke-width", "2px")
                .style("opacity", 0.7)
        },

        /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
        [props.data])

    return (
        <svg
            className="d3-component"
            width={450}
            height={400}
            ref={d3Container}
        />
    );
}

const RefreshGraph = (props) => {
const setdata = props.setdata;
const sliders = props.sliders;
const write =()=>{
    const piChart = {}
    //console.log("Says Hi on Click")
    for (let index = 0; index < sliders.length; index++) {
        console.log(sliders[index].total)
        piChart[String.fromCharCode(97+index)] = sliders[index].total; 
    }
    console.log(piChart)
    setdata(piChart)
}

return(
    <button onClick ={write}>Refresh Graph</button>
)
}

/* App */
//in this current interation I don't need use Effect, should clean up
const D3Chart = (props) => {
    console.log("D3 Chart")
    console.log(props.sliders)
    const [ data, setdata] = useState([1]); //should initilize with state 

   // console.log(data)
    return (
        <div className="my-app">
            <div>
            <MyD3Component data={data} sliders = {props.sliders}/>
            </div>
            <RefreshGraph setdata ={setdata}  sliders = {props.sliders}/>
        </div>
    )
}

export default D3Chart