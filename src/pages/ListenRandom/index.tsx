import {Button} from 'antd-mobile'

// 点击增加减少按钮
function HandleButton() {
    return (
        <div >
            <div className="flex items-center justify-center">
                <Button color='primary'>一</Button>
                <div className='p-6'>
                    0
                </div>
                <Button color='primary'>+</Button>
            </div>
            <div className="flex items-center justify-center">
                <Button color='primary'>随机一下</Button>
            </div>

        </div>
    )
}

function ListenRandomPage() {
    return (
        <HandleButton/>
    )
}

export default ListenRandomPage