
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Settings, History } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-8 space-y-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </Button>

      <h1 className="text-4xl title-gradient">Mon Profil</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <User className="w-12 h-12 text-purple-500" />
            <div>
              <h2 className="text-2xl font-bold">Informations Personnelles</h2>
              <p className="text-gray-500">Gérez vos informations de profil</p>
            </div>
          </div>
          <Button className="w-full">Modifier le profil</Button>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <Settings className="w-12 h-12 text-pink-500" />
            <div>
              <h2 className="text-2xl font-bold">Paramètres</h2>
              <p className="text-gray-500">Personnalisez votre expérience</p>
            </div>
          </div>
          <Button className="w-full">Gérer les paramètres</Button>
        </Card>

        <Card className="p-6 space-y-4 md:col-span-2">
          <div className="flex items-center gap-4">
            <History className="w-12 h-12 text-orange-500" />
            <div>
              <h2 className="text-2xl font-bold">Historique des Générations</h2>
              <p className="text-gray-500">Consultez vos générations précédentes</p>
            </div>
          </div>
          <Button className="w-full">Voir l'historique</Button>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
