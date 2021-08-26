import { IonPage, IonContent } from "@ionic/react";
import SelectLevel from "../components/SelectLevel";

import "./Home.css";

const SelectLevelPage: React.FC = () => {
  return (
    <IonPage> 
    <SelectLevel/>     
    </IonPage>
  );
};

export default SelectLevelPage;
