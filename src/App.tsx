import './App.css'
import {getAlbumDataApi} from "@/api";

function getAlbumData() {
    const params = {
        singermid:'000CK5xN3yZDJt',
        limit:52
    }
    getAlbumDataApi(params).then(res => {
        console.log(res)
    })
}

function App() {
  return (
    <>
      <button onClick={getAlbumData}>
        初始化
      </button>
    </>
  )
}

export default App
