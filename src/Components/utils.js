import drivers from "../files/drivers.json";
import hotels from "../files/hotels.json";
import trips from "../files/trips.json";

export let delivery = [];
trips.filter((item) => {
  drivers.map((data) => {
    if (item.driver_id === data.uuid) {
      delete Object.assign(item, {
        driver_name: `${data.first_name} ${data.last_name}`,
      })["driver_id"];
    }
  });

  //getting hotel name
  hotels.map((hotel) => {
    if (item.hotel_id === hotel.uuid) {
      delete Object.assign(item, { hotel_name: `${hotel.name}` })["hotel_id"];
      const time = new Date(item.start_time)
      Object.assign(item, {date:time.getDay()})
      delivery.push(item);
    }
  });
});

function getId(item){

  return item['date']
}


export const totalTrips = delivery.reduce((previous,next)=>{
  const id =getId(next)

  const index = previous.findIndex(item => id === getId(item))

  if(index !== -1){
    previous[index]['ridedates'] +=1
      }else{
        previous.push({
          ...next,
          ridedates :1
        })
      }
      return previous

}, [])

