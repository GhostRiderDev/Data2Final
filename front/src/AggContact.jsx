import { addContact } from "./services/contact";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AlertsExito } from "./components/alerts/Alerts";

function AggContact({ onclose }) {
    const [contact, setContact] = useState(null)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const handleCancelar = () => {
        onclose();

    }
    const enviarContacto = async (data) => {
        const response = await addContact(data);
        if (response) {
            setContact(response)
            AlertsExito();
        }
    }


    return (
        <form onSubmit={handleSubmit(enviarContacto)}>
            <div className=" flex justify-center items-center ">
                <div className="lg:w-[420px] md:w-[320px] w-[320px] border border-slate-700 rounded-lg pt-6  pb-6 px-8 space-y-4">
                    <div><h1><strong>Agregar Nuevo Contacto</strong></h1>
                        Formulario para agregar un nuevo contacto
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-medium text-black">Nombre</label>
                        <input {...register("name", { required: true })} className="mt-1 p-2 w-full border border-slate-800 rounded-md" />
                        {errors.name && <span className="text-red-500">Este campo es requerido</span>}
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-medium text-black">Telefono</label>
                        <input {...register("phone", { required: true })} className="mt-1 p-2 w-full border  border-slate-800 rounded-md " />
                        {errors.phone && <span className="text-red-500">Este campo es requerido</span>}
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-medium text-black">Correo</label>
                        <input {...register("email", { required: true })} className="mt-1 p-2 w-full border  border-slate-800 rounded-md placeholder:pl-2" placeholder="name@example.com" />
                        {errors.email && <span className="text-red-500">Este campo es requerido</span>}
                    </div>
                    <div className="w-full flex flex-rows gap-5 pt-4">
                        <button className="bg-slate-950 text-white rounded-md w-[100px] h-[35px]" type="submit">Agregar</button>
                        <button className="bg-slate-950 text-white rounded-md w-[100px] h-[35px]" onClick={handleCancelar}>Cancelar</button>
                    </div>
                </div>
            </div>
        </form>

    );

}
export default AggContact;