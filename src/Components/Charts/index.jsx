import React, {useState} from "react";
import { delivery } from "../utils";
import Layout from "../Layout";
import { Chart } from "chart.js/auto";
import { Bar , Line} from "react-chartjs-2";
import { totalTrips } from "../utils";
import { EuiComboBox,EuiFlexGroup,EuiText, EuiFlexItem} from "@elastic/eui";
import { headerText , container} from "./styles";


const Charts = () => {
    const [driverFilter, setDriverFilter] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedHotelOptions, setSelectedHotelOptions] = useState([])
    const [hotelFilter, setHotelFilter] = useState(null);
  let ratingObject = {};

  let count = 0;
  delivery.forEach((data) => {
    if (ratingObject.hasOwnProperty(data.driver_name)) {
      ratingObject[data.driver_name] =
        ratingObject[data.driver_name] + data.rating;
    } else {
      ratingObject[data.driver_name] = data.rating;
    }

  });

  let ratings = [];
  for (let item in ratingObject) {
    // console.log(ratingObject);
    ratings.push({ driver_name: item, ratingValue: ratingObject[item] });
  }
 

  let sortedRatings =ratings.sort(
   ( item1, item2) =>(item1.ratingValue <item2.ratingValue) ? 1: (item1.ratingValue > item2.ratingValue) ? -1 :0
  )
  
  //bar chart data
  const labels =  sortedRatings.slice(0,3).map(item => item.driver_name)
  console.log(labels);
  const rateData = sortedRatings.slice(0,3).map(item => item.ratingValue)
  const chartData = {
    labels:labels,
    datasets: [
        {
            label: "Driver ratings",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: rateData,
        }
    ]
  }
  console.log(totalTrips);

//   Line chart data

   // filter chart with driver name 
const driverNames = [
    ...new Set(totalTrips.map((item) => item.driver_name)),
];
const driverNameObject = []

driverNames.reduce((accumulator, value) => {
    driverNameObject.push({...accumulator, 'label': value});
  }, {});


  const applyDriverFilter = (driver) => {
    const drivers = driver.driver_name;
    return !driverFilter || driverFilter.includes(drivers);
};

//  filter chart with hotel names
const hotelNames = [
    ...new Set(totalTrips.map((item) => item.hotel_name)),
];
const hotelNameObject = []

hotelNames.reduce((accumulator, value) => {
    hotelNameObject.push({...accumulator, 'label': value});
  }, {});


  const applyHotelFilter = (hotel) => {
    const hotels = hotel.hotel_name;
    return !hotelFilter || hotelFilter.includes(hotels);
};

// dropdown onchange
const onDriverOptionChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  const item =  selectedOptions.map(item => item.label)
    setDriverFilter(item)
  };

  const onHotelOptionChange = (selectedOptions) => {
    setSelectedHotelOptions(selectedOptions);
  const item =  selectedOptions.map(item => item.label)
    setHotelFilter(item)
  };

  const sortedRides =totalTrips
  .filter(applyDriverFilter)
  .filter(applyHotelFilter)
  .sort(
    ( item1, item2) =>(item1.date <item2.date) ? 1: (item1.date > item2.date) ? -1 :0
   )

const lineLabels =sortedRides.map(item=>item.date)
const lineData ={
    labels:lineLabels,
    datasets:[{
        label: "Total drives taken",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: sortedRides.map(item => item.ridedates),
    }]
}

  return (
    <Layout header={"Data Overview"}>
      <div className={container}>
         <h2 className={headerText}>Trips Taken</h2>
         <EuiFlexGroup responsive={true} alignItems="center" justifyContent="spaceAround">
   
          <EuiFlexItem>
         <EuiText>Filter Drivers:</EuiText>
          <EuiComboBox
        aria-label="Deliveries filters"
        placeholder="Select driver name"
        options={driverNameObject}
        selectedOptions={selectedOptions}
        onChange={onDriverOptionChange}
        isClearable={true}
        data-test-subj="driverNames"
        autoFocus
      />
      </EuiFlexItem>
      <EuiFlexItem > 
          <EuiText>Filter Hotels:</EuiText>
                <EuiComboBox
        aria-label="Deliveries filters"
        placeholder="Select hotel name"
        options={hotelNameObject}
        selectedOptions={selectedHotelOptions}
        onChange={onHotelOptionChange}
        isClearable={true}
        data-test-subj="hotelNames"
        autoFocus
      /></EuiFlexItem>
      </EuiFlexGroup>
      <div></div>
         <Line data={lineData}/>

      <h2 className={headerText}>Driver Ratings</h2>
      <Bar data={chartData}/>
</div>
    </Layout>
  );
};

export default Charts;
