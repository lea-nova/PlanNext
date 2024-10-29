import Navbar from "../../../components/Navbar/page";
import TitleInput from "../../../components/input/TitleInput";
const NewTask: React.FC = () => {
return (<div>
    <Navbar/>
    <h1 className="">Créer une nouvelle liste.</h1>
    <TitleInput/>
</div>)
}

export default NewTask;