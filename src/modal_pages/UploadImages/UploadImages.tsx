import "./UploadImages.css"

interface Props{
    files: File[] | null
    setFiles: React.Dispatch<React.SetStateAction<File[] | null>>
}

export default function AddImages({files, setFiles}: Props){
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            files && setFiles([...files, ...e.target.files]);
            !files && setFiles([...e.target.files]);
        }
      };

      return (
        <>
            
            <div className="input-file-row">
                <label className="input-file">
                    <input type="file" name="file[]" multiple onChange={handleFileChange}/>		
                    <span>Выберите файл</span>
                </label>
                {
                files &&
                    [...files].map((file, index) => (
                    <>
                    <div className="one-file">
                    <section key={file.name}>
                        Файл {index + 1}:
                        <ul>
                        <li>Имя: {file.name}</li>
                        <li>Тип: {file.type}</li>
                        <li>Размер: {file.size / 1024} КБ</li>
                        </ul>
                    </section>
                    <button onClick={() => [...files].find(FILE => {FILE.name == file.name; setFiles([...files].filter(FILE => FILE.name != file.name))})}>удалить</button>
                    </div>
                    </>
                ))}
            </div>
        </>
      );
}