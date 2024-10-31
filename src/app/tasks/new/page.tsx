import Navbar from "../../../components/Navbar/page";
// import TitleInput from "../../../components/input/TitleInput";
import Input from "../../../components/input/input";
const NewTask: React.FC = () => {
return (<div>
    <Navbar/>
    <h1 className="">Créer une nouvelle liste.</h1>
    {/* <TitleInput/> */}
    <Input/>
</div>)
}

export default NewTask;