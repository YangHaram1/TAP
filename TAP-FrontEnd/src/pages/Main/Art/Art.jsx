import styles from './Art.module.css'

export const Art = ({category})=>{

    console.log(category);

    if(category === "musical"){
        console.log("뮤지컬 정보 불러오기");
    }else if(category === "concert"){
        console.log("콘서트 정보 불러오기");
    }else{
        console.log("잘못된 접근 확인 필요");
    }

    return (
        <div className={styles.container}>
            {category}
        </div>
    );

}