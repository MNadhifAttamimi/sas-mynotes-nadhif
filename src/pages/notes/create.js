import { useState } from "react";
import { useRouter } from "next/navigation";

export default function registrasi() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

    const handleRegistration = async () => {
        const data = { title, note };
        console.log('click note by: ', data);

        try {
            const res = await fetch('/api/create', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await res.json(); // Mendapatkan data JSON dari respons
            console.log(responseData);
            alert('Data sudah sukses didaftarkan');

            if (res.ok) {
                // Periksa apakah respons memiliki status code 200 (OK)
                router.push('/notes/list')
            } else {
                console.error('Gagal melakukan permintaan:', res.status);
                alert('Data gagal didaftarkan');
            }
        } catch (error) {
            console.log('error: ', error);
            alert('Terjadi Kesalahan, harap hubungi tim support');
        }
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div style={{
                border: "solid silver 2px",
                boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                color: "black",
                borderRadius: "8px",
                padding: "20px",
                width: "40%"
            }}>
                <div>
                    <h2>Buat Catatan</h2>

                    <div style={{ display: "flex", flexDirection: "column", marginRight: "20px", marginTop: "20px", gap: "10px" }}>
                        <h3>Title <span style={{ color: 'blue' }}>*</span> </h3>
                        <input
                            style={{
                                width: "70%",
                                marginTop: "4px",
                                padding: "10px 5px",
                                border: "2px solid silver"
                            }}
                            placeholder="Judul"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                        />

                        <h3>Notes <span style={{ color: 'blue' }}>*</span> </h3>
                        <input
                            style={{
                                width: "70%",
                                marginTop: "4px",
                                padding: "10px 5px",
                                border: "2px solid silver"
                            }}
                            placeholder="Catatan"
                            value={note}
                            onChange={(e) => {
                                setNote(e.target.value)
                            }}
                        />

                        <button
                            style={{
                                width: "72%",
                                marginTop: "15px",
                                padding: "15px 20px",
                                backgroundColor: "blue",
                                color: "white",
                                fontWeight: "600",
                                border: "2px solid blue"
                            }}
                            onClick={handleRegistration}
                        >
                            Buat
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}