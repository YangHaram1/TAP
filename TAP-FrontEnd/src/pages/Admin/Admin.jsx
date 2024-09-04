import {styles} from './Admin.module.css'

export const Admin=()=>{

    return(
        <div className={styles.container}>
            <Header/>
            <AdminContent/>
        </div>
    )
}