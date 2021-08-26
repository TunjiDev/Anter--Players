import { IonPage, IonContent } from "@ionic/react";
import Profile from "../components/Profile";

import "./Home.css";

const ProfilePage: React.FC = () => {
  return (
    <IonPage>
     <IonContent>
     <Profile/>
     </IonContent>
       

    </IonPage>
  );
};

export default ProfilePage;
