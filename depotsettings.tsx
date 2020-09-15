import TextField from "@material-ui/core/TextField";
import { Box } from "@sjse/component-library";
import MaterialTable from "material-table";
import { ChangeEvent, ChangeEventHandler, default as React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityModel } from "../../models/activity-model";
import { DepotModel } from "../../models/depot-model";
import DepotService from "../../services/depot-service";
import { Label } from "react-konva";
import styled from "@emotion/styled";
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
import { response } from "msw/lib/types";
import { DepotSettingsModel } from "../../models/depot-settings-model";
import { ThemeContext } from "@emotion/core";
import { data } from "msw/lib/types/context";
import { keys } from "@material-ui/core/styles/createBreakpoints";
import { Container } from "@material-ui/core";


interface DepotSettingsProps {

  currentDepot: DepotModel
}



function DepotSettings(props: DepotSettingsProps ) {
  const { t } = useTranslation();
  const [activities, setActivities] = useState<ActivityModel[]>([]);
  const [state, setState] = React.useState({
    columns: [
      { title: t("settings.activity"), field: 'name' },
      { title: t("settings.depotsettings_color"), field: 'color' },
    ],
    data: activities

  });

  const getActivities = () => {
    DepotService.getActivities()
      .then((response) => {
       console.log( response.data[0].id)
        setState({
          columns: [
            { title: t("settings.activity"), field: 'name' },
            { title: t("settings.depotsettings_color"), field: 'color' },
          ],
          data: response.data
        }
        )
        console.log("ID ====>>>", props.currentDepot.id)
        setActivities(response.data);
      }).catch((e) => {
        console.log(e);
      });
  }





  // const j: ({
  //   columns: [
  //     { title: t("settings.activity"), field: 'name' },
  //     { title: t("settings.depotsettings_color"), field: 'color' },
  //   ],
  //   data: depotSettingModel
  // }
  // )
 



//  const postDepotSettingsModel =()=>{
//     DepotService.postSettingsDepot(title)
//     .then((response)=>{
//       console.log("Error: " + response.data)
//     }).catch(error=>{
//       console.log("Error: " + error)
//     })
//   }


const dataTest = {

  id : '3',
  value: "Adriana",
  depotId : 0 ,
  settingId: 0
 }


// const postDepotSettingsModel = () =>{
//   axios.post('http://localhost:8080/settings', dataTest)
//   .then(response =>{
//     console.log('POST RESPONSE DATA ::: ',response.data)
//   }).catch(error =>{
//     console.log('ERROR::: ', error)
//   })

// }

const clicked = (e: any) => {
  e.preventDefault();
  console.log('CLICKED ')
 // postDepotSettingsModel()

}

type User = {
  name: string;
  age: number | null;
  admin: boolean;
};

const defaultUser = {
  "id": 1,
  "value": "Test",
  "depotId": 0,
  "settingId": 0
};


const [depotSettingModel, setDepotsettingModel] = useState<DepotSettingsModel[]>([]);
  const getDepotSettingsModel  =() =>{
    DepotService.getSettingsDepot()
    .then((response) => {
     // console.log(JSON.stringify(response.data))
      setDepotsettingModel(response.data)
    }).catch(error =>{
      console.log('ERROR:::: ', error)
    })

  }

const [user, setUser] = useState(defaultUser);
 const onUserChange = <P extends keyof DepotSettingsModel>(prop: P, value: DepotSettingsModel[P]) => {

  setUser({ ...user, [prop]: value });
  console.log(user)
};


// axios({
//   method: 'post',
//   url: 'http://localhost:8080/settings',
//   data: {
//     id : 0,
//     settingType : 'depot',
//     name: 'snabbbl',
//     description: 'jhkdfhl',
//     tooltip: 'tolllljjjdjkdjfjlll',
//     defaultValue : '3',
//     dataType : "integer",
//     sortOrder: 0
//   }
// }).then((response) => {
//   console.log(response.data);
// }, (error) => {
//   console.log(error);
// });


  
  // Runs once when component loads
  useEffect(() => {
    getActivities();
    getDepotSettingsModel()
   //postDepotSettingsModel()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box p={1} m={1}>
      <Box data-testid="planning" p={1} m={1}>
        <form noValidate autoComplete="off">
          <div>


            <TextField
              required
              id="depot-name"
              label={t("settings.depotsettings_name")}
              variant="outlined"
              value={props.currentDepot.name}
            />
            <TextField
              required
              id="depot-code"
              label={t("settings.depotsettings_code")}
              variant="outlined"

           
              value={props.currentDepot.code}
              


           
            />
            <br/>

{/* 
           <Container>
         
           
             <form>

               {depotSettingModel.map((input, i )=>(
                 <div key={i}>
                <label>{input.description}</label>  <input type={'number'} placeholder={input.defaultValue}/> {input.defaultValue}
                 </div>

               ))}
             </form>
         
             </Container> */}


{/* {depotSettingModel.map(d=>{
  return(
  <label style={{ display: "inline-block"}}>
   {d.description}  
   <input 
   
   type="string" name={'dsk'} 
   key={d.id} 
   placeholder={d.defaultValue} 
   value={user.defaultValue}
        onChange={e => {
          onUserChange('defaultValue', e.target.value);
        }}
 
   /> 
   <label>{d.defaultValue} </label>
</label>
  )
  
})}
<br/> */}




<button type="submit" onClick={(e) => {clicked(e)}}>Button</button>



          </div>
        </form>
      </Box>
     
   
    </Box>


  );
}

export default DepotSettings;