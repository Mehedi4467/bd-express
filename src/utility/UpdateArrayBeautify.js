import { viewUpdate } from "../api/BookingApi/updateBookingGetApi"

export const UpdateFinalArray = async(data,BookingID)=>{
    const cartons= []
    const mother_carton = []

    for(let item of data){
        cartons.push({
            carton_no:item?.carton_no,
            mother_carton:parseInt(item?.mother_carton),
            weight:parseFloat(item?.weight),
            route:item?.route,
            item:item?.item,
        })

        if(mother_carton?.find(carton=>carton?.carton_no === parseInt(item?.mother_carton))){
           const main = mother_carton?.find(carton=>carton?.carton_no === parseInt(item?.mother_carton))
           const index = mother_carton.indexOf(main);
           mother_carton[index].total_weight = parseFloat(mother_carton[index].total_weight) + parseFloat(item?.weight);
           mother_carton[index].route =data?.find((routeItem)=> routeItem?.route === "HK") ? "HK" : "GZ";
        }else{
            mother_carton.push({
                carton_no:parseInt(item?.mother_carton),
                // total_weight:parseFloat(item?.finalWeight),
                total_weight:parseFloat(item?.weight),
                route:item?.route,
            })
        }
    }


    const main = await mainDataMotherCorton(BookingID);
    const motherCartonMainValue = motherCortonCalculation(main,mother_carton)

    if(cartons?.every(cartonitem=> cartonitem?.carton_no && cartonitem?.mother_carton && cartonitem?.mother_carton && cartonitem?.weight && cartonitem?.item.length > 0) && motherCartonMainValue && mother_carton.every(motherCarton=> motherCarton?.carton_no && motherCarton?.total_weight && motherCarton?.route)){
        return {cartons,motherCartonMainValue}
    }else{
        return false
    }
}





const mainDataMotherCorton = async(BookingID)=>{
    const z = await viewUpdate(BookingID);
    if(z?.status){
        const duplicateMotherCartons = [];
        z?.data?.carton_data.forEach(item => {
        if(duplicateMotherCartons?.find(carton=>carton?.carton_no === parseInt(item?.mother_carton))){
            const main = duplicateMotherCartons?.find(carton=>carton?.carton_no === parseInt(item?.mother_carton))
            const index = duplicateMotherCartons.indexOf(main);
            duplicateMotherCartons[index].total_weight = parseFloat(duplicateMotherCartons[index].total_weight) + parseFloat(item?.weight);
            duplicateMotherCartons[index].route =z?.data?.carton_data?.find((routeItem)=> routeItem?.route === "HK") ? "HK" : "GZ";
        }else{
            duplicateMotherCartons.push({
                carton_no:parseInt(item?.mother_carton),
                total_weight:parseFloat(item?.weight),
                route:item?.route,
            })
        }

    });
        return duplicateMotherCartons;
    }else{
        return false;
    }
}



const motherCortonCalculation = (mainCarton,updateCarton)=>{


    if(mainCarton && updateCarton){
        const finalMotherCarton = [];
            mainCarton.forEach(item => {{
                if(updateCarton?.find(carton=>carton?.carton_no === parseInt(item?.carton_no))){

                    finalMotherCarton.push({
                        carton_no : parseInt(item?.carton_no),
                        route:item?.route,
                        total_weight: updateCarton?.find(carton=>carton?.carton_no === parseInt(item?.carton_no) && carton?.total_weight)?.total_weight - item?.total_weight
                    })
                }else{
                    finalMotherCarton.push({
                        carton_no : parseInt(item?.carton_no),
                        route:item?.route,
                        total_weight: updateCarton?.find(carton=>carton?.carton_no !== parseInt(item?.carton_no) && carton?.total_weigh )?.total_weight - item?.total_weight
                    })
                }
            }})

        return finalMotherCarton;
    }else{
        return false;
    }

    
}



