import { IonPage, IonContent } from "@ionic/react";
import Questions from "../components/Questions";

import "./Home.css";

const QuestionPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
      <Questions/>
      </IonContent>
    </IonPage>
  );
};

export default QuestionPage;
