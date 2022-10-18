const Notification =({notification})=>{
    if(notification === null){
        return null
    }

    const style ={
        color: notification.type === 'alert' ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    console.log('notification message: ', notification)

    return(
        <div id="notification" style={style}>
            {notification}
            
            

        </div>
    )

}

export default Notification