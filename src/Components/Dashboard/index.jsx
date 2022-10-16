import React, {useState, useMemo} from "react";
import {
    formatDate,
    EuiBasicTable,
    EuiSpacer,
    EuiHorizontalRule,
    EuiText,
    EuiComboBox,
    EuiFlexGroup,
    EuiFlexItem,
    EuiSwitch,
    EuiCode
  } from '@elastic/eui';
 import { delivery } from "../utils";

const Dashboard = ()=>{

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [showPerPageOptions, setshowPerPageOptions] = useState(true);
    const [driverFilter, setDriverFilter] = useState(null);
    const [hotelFilter, setHotelFilter] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedHotelOptions, setSelectedHotelOptions] = useState([])
  

//   dropdown onchange
const onDriverOptionChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  const item =  selectedOptions.map(item => item.label)
    setDriverFilter(item)
  };

  const onHotelOptionChange = (selectedOptions) => {
    setSelectedHotelOptions(selectedOptions);
  const item =  selectedOptions.map(item => item.label)
    setHotelFilter(item)
    console.log(item);
  };

  


    const onPageChange =({page ={}})=>{
        const {index:pageIndex, size:pageSize} = page;
        setPageIndex(pageIndex)
        setPageSize(pageSize)

    }
    const togglePerPage =() =>setshowPerPageOptions(!showPerPageOptions);
    const totalItems = delivery.length

    // Removing duplicates form driver name and hotel name
    const driverNames = [
		...new Set(delivery.map((item) => item.driver_name)),
	];
    const driverNameObject = []
    
    driverNames.reduce((accumulator, value) => {
        driverNameObject.push({...accumulator, 'label': value});
      }, {});
  

    const hotelNames = [
		...new Set(delivery.map((item) => item.hotel_name )),
	];

    const hotelNameObject = [];

    hotelNames.reduce((accumulator, value) => {
        hotelNameObject.push({...accumulator, 'label': value});
      }, {});


    const applyDriverFilter = (driver) => {
		const drivers = driver.driver_name;
		return !driverFilter || driverFilter.includes(drivers);
	};

    const applyHotelFilter = (hotel) => {
		const hotels = hotel.hotel_name;
		return !hotelFilter || hotelFilter.includes(hotels);
	};

    const filteredData = delivery
    .filter(applyDriverFilter)
    .filter(applyHotelFilter)

const currentDeliveryData = useMemo(()=>{
    return filteredData.slice(pageIndex,pageSize)
})


const columns =[
    {
        field:'driver_name',
        name:'Driver Name',
        truncateText:true,
        mobileOptions:{
            // show:false,
            header:false,
            enlarge:true
        }
    },
    {
        field:'hotel_name',
        name:'Hotel Name',
        truncateText:true,
        mobileOptions:{
            // show:false,
            header:false,
            enlarge:true
        }
    },
    {
        field:'rating',
        name:'Rating',
        truncateText:true,
        mobileOptions:{
            show:false
        }
    },
    {
        field:'start_time',
        name:'Start Time',
        truncateText:true,
        dataType:'date',
        render:(date) => formatDate(date,'shortDateTime'),
        mobileOptions:{
            // show:false,
            header:false,
            enlarge:false
        }
    },
    {
        field:'delivery_time',
        name:'End Time',
        truncateText:true,
        dataType:'date',
        render:(date) => formatDate(date,'shortDateTime'),
        mobileOptions:{
            // show:false,
            header:false,
            enlarge:false
        }
    },

]

const pagination ={
    pageIndex,
    pageSize,
    totalItems,
    pageSizeOptions :[10,0],
    showPerPageOptions,
}
const results = pageSize === 0?(
    <strong>All</strong>
):(
    <>
    <strong>
        {pageSize * pageIndex +1} -{pageSize * pageIndex +pageSize}
        </strong>
        {''} of {totalItems}
        </>
)

    return(
       <div>

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
       
   <EuiSpacer size="xl" />
      <EuiText size="xs">
        Showing {results} <strong> Deliveries</strong>
      </EuiText>
      <EuiSpacer size="s" />
      <EuiHorizontalRule margin="none" style={{ height: 2 }} />
      <EuiBasicTable
        tableCaption="Dashboard table"
        items={currentDeliveryData}
        columns={columns}
        pagination={pagination}
        onChange={onPageChange}
      />
       </div>
    )
}

export default Dashboard;