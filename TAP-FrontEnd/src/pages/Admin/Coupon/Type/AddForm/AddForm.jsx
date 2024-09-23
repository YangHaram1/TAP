import { useEffect, useState } from 'react';
import styles from './AddForm.module.css';
import { useAuthStore } from '../../../../../store/store';
import { api } from './../../../../../config/config';
import SweetAlert from '../../../../../components/SweetAlert/SweetAlert';

const AddForm = ({ setAddForm,setAdd,grade}) => {
    const { isAuth } = useAuthStore();
 

    const [data, setData] = useState({
        seq: '',
        title: '',
        contents: '',
        discount: 0,
        coupon_order: ''
    });
    const [viewDiscount,setViewDisCount]=useState(0);
    const [regexData, setRegexData] = useState({
        discount: false,
        title: false,
        contents: false,
        coupon_order: false
    })
    const [checkAll, setCheckAll] = useState();


   
    useEffect(() => {
        //(regexData.birth&&regexData.address&&regexData.detailed_address)
        const allTrue = Object.values(regexData).every(value => value === true)
        setCheckAll(allTrue)
    }, [regexData])


 

    const handleData = (e) => {
        const { name, value } = e.target;
        if(name!=='discount')
        setData((prev) => {
            return { ...prev, [name]: value }
        })
       
       

        if (name === 'email') {
            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;
            setRegexData((prev) => {
                return { ...prev, [name]: regex.test(value) }
            })

        }
        else if (name === 'title') {
            const regex = /^.{1,30}$/;
            setRegexData((prev) => {
                return { ...prev, [name]: regex.test(value) }
            })
        }
        else if (name === 'discount') {

            const temp = parseInt(value.replace(/,/g, ''), 10); // 문자열을 정수로 변환
            // 값이 NaN이거나 음수인 경우 0으로 고정
            const fixedValue = isNaN(temp) || temp < 0 ? 0 : temp;
            const formattedValue = new Intl.NumberFormat().format(fixedValue);
            setViewDisCount(formattedValue)
            setData((prev) => {
                return { ...prev, [name]: fixedValue }
            })

            if(fixedValue){
                setRegexData((prev) => {
                    return { ...prev, [name]: true }
                })
            }
            else{
                setRegexData((prev) => {
                    return { ...prev, [name]: false }
                })
            }
        }

    }
    const handleContents = (e) => {
        const value = e.target.innerText; // contentEditable의 텍스트 값을 가져옴
        setData((prev) => {
            return { ...prev, contents: value }
        })
        const regex = /^([\s\S]{1,1000})$/;
        setRegexData((prev) => {
            return { ...prev, contents: regex.test(value) }
        })

    }
    // useEffect(()=>{
    //     console.log(regexData)
    // },[regexData])

    const handleInputDelete = (e, type) => {
        setData((prev) => {
            return { ...prev, [type]: '' };
        })
        setRegexData((prev) => {
            return { ...prev, [type]: false }
        })
    } 

    const handleChange = (event) => {
        setData((prev) => {
            return { ...prev, coupon_order: event.target.value }
        }); // 선택된 값을 상태로 업데이트
        if (event.target.value !== '선택')
            setRegexData((prev) => {
                return { ...prev, coupon_order: true }
            })
        else {
            setRegexData((prev) => {
                return { ...prev, coupon_order: false }
            })
        }
    };

    const handleConfirm = () => {
        api.post(`/coupon/type`,data).then((resp)=>{
            setAddForm(false);
            // setList((prev)=>{
            //     return [...prev,{...data,seq:resp.data}];
            // })
            setAdd((prev)=>{
                return !prev;
            })
        })
    }

    const handleCancel = () => {
        setAddForm(false);
        window.scrollTo(0, 0);
    }


    return (
        <div className={styles.container}>
            <div className={styles.input1}>
                <div className={styles.header}>
                    쿠폰 추가하기
                </div>
                <div className={styles.contents}>
                    <div className={styles.title}>
                        이름 <span>*</span>
                    </div>
                    <div className={styles.input}>
                        <input type="text" placeholder='이름을 입력해주세요' name='title' value={data.title} onChange={handleData} />
                        {(<button className={data.title !== '' ? styles.cancel : styles.hidden} onClick={(e) => { handleInputDelete(e, 'title') }}>X</button>)}
                    </div>
                    <div>
                        {data.title === '' ? <span>30자 이내로 입력해주세요.</span> : (regexData.title ? (<span style={{ color: 'blue' }}>30자 이내 입니다.</span>) : (<span>30자 이내로 적어주세요</span>))}
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.title}>
                        내용 <span>*</span>
                    </div>
                    <div className={styles.contentsInput} contentEditable={true} onInput={handleContents} name='contents'>

                    </div>
                    <div>
                        {data.contents === '' ? <span>내용을 입력해주세요.</span> : (regexData.contents ? (<span style={{ color: 'blue' }}>1000자 이내 입니다.</span>) : (<span>1000자 이내로 적어주세요</span>))}
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.title}>
                        할인가격 <span>*</span>
                    </div>
                    <div className={styles.input}>
                        <input type="text" placeholder='할인 가격을 입력해주세요' value={viewDiscount} name='discount' onChange={handleData} />
                        {/* {(<button className={data.discount !== 0 ? styles.cancel : styles.hidden} onClick={(e) => { handleInputDelete(e, 'discount') }}>X</button>)} */}
                    </div>
                    <div>
                        {data.discount === '' ? <span>입력해주세요</span> : (regexData.discount ? (<span style={{ color: 'blue' }}>입력 완료 되었습니다.</span>) : (<span>숫자로만 입력해주세요</span>))}
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.title}>
                        쿠폰 등급 <span>*</span>
                    </div>
                    <div className={styles.input}>
                        <select className={styles.select} value={data.coupon_order} onChange={handleChange}>
                            <option value="">선택</option>
                            {
                                grade.map((item, index) => {
                                    return (
                                        <option value={item.grade_order}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {data.coupon_order === '' ? <span>선택해 주세요.</span> : (regexData.coupon_order ? (<span style={{ color: 'blue' }}>선택 완료되었습니다.</span>) : (<span>선택해 주세요.</span>))}
                </div>

                <div className={styles.contents}>
                    <div className={styles.btnForm}>
                        <div className={styles.confirmReverse}>
                            <button onClick={handleCancel}>취소하기</button>
                        </div>
                        <div className={checkAll ? styles.confirmReverse : styles.confirm}>
                            <button onClick={()=>{SweetAlert('warning','쿠폰','추가 하시겠습니까?',handleConfirm)}}>추가하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddForm