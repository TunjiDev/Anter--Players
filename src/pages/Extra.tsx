import { IonPage, IonContent } from "@ionic/react";
import Extra from "../components/Extra";

import "./Home.css";

const ExtraPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
       <Extra/>
      </IonContent>
    </IonPage>
  );
};

export default ExtraPage;
