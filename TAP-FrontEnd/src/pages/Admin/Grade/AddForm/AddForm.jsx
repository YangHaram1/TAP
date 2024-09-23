import React, { useEffect, useState } from 'react';
import styles from './AddForm.module.css';
import { useAuthStore } from '../../../../store/store';
import { api } from './../../../../config/config';
import SweetAlert from '../../../../components/SweetAlert/SweetAlert';
import Swal from 'sweetalert2';

const AddForm = ({ setAddForm, setAdd, grade, setList,setGrade }) => {
    const { isAuth } = useAuthStore();


    const [data, setData] = useState({
        seq: '',
        name: '',
        min_point: 0,
        benefits: 0,
        grade_order: 0
    });
    const [viewMinPoint, setViewMinPoint] = useState(0);
    const [viewBenefits, setViewBenefits] = useState(0);
    const [regexData, setRegexData] = useState({
        name: false,
        min_point: false,
        benefits: false,
        grade_order: false,
        nameCheck: false
    })
    const [checkAll, setCheckAll] = useState();



    useEffect(() => {
        //(regexData.birth&&regexData.address&&regexData.detailed_address)
        const allTrue = Object.values(regexData).every(value => value === true)
        setCheckAll(allTrue)
    }, [regexData])




    const handleData = (e) => {
        const { name, value } = e.target;
        if (name !== 'discount')
            setData((prev) => {
                return { ...prev, [name]: value }
            })



        if (name === 'email') {
            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;
            setRegexData((prev) => {
                return { ...prev, [name]: regex.test(value) }
            })

        }
        else if (name === 'name') {
            const regex = /^.{1,30}$/;
            setRegexData((prev) => {
                return { ...prev, [name]: regex.test(value) }
            })
        }
        else if (name === 'min_point' || name === 'benefits') {

            const temp = parseInt(value.replace(/,/g, ''), 10); // 문자열을 정수로 변환
            // 값이 NaN이거나 음수인 경우 0으로 고정
            const fixedValue = isNaN(temp) || temp < 0 ? 0 : temp;
            const formattedValue = new Intl.NumberFormat().format(fixedValue);
            if (name === 'min_point') {
                setViewMinPoint(formattedValue)
            }
            else if (name === 'benefits') {
                setViewBenefits(formattedValue)
            }

            setData((prev) => {
                return { ...prev, [name]: fixedValue }
            })

            if (fixedValue) {
                const regex = /^\d{0,13}$/; 
                if (regex.test(fixedValue) && (fixedValue >= -2147483648 && fixedValue <= 2147483647)) {
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
            else {
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
            return { ...prev, grade_order: event.target.value }
        }); // 선택된 값을 상태로 업데이트
        if (event.target.value !== '선택')
            setRegexData((prev) => {
                return { ...prev, grade_order: true }
            })
        else {
            setRegexData((prev) => {
                return { ...prev, grade_order: false }
            })
        }
    };

    const handleConfirm = () => {
        api.post(`/grade`, data).then((resp) => {
            setAddForm(false);
            // setList((prev) => {
            //     return [...prev, { ...data, seq: resp.data }];
            // })
            // setGrade((prev)=>{
            //     return [...prev, { ...data, seq: resp.data }];
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

    const handleCheckName = () => {
        const name = data.name;
        api.post(`/grade/${name}`).then(() => {
            setRegexData((prev) => {
                return { ...prev, nameCheck: true }
            })
            Swal.fire({
                icon: 'success',
                title: '멤버쉽',
                text: '사용 가능한 이름 입니다.'
            })
        }).catch(() => {
            setRegexData((prev) => {
                return { ...prev, nameCheck: false }
            })
            Swal.fire({
                icon: 'error',
                title: '멤버쉽',
                text: '사용 불가능한 이름 입니다.'
            })
        })
    }


    return (
        <div className={styles.container}>
            <div className={styles.input1}>
                <div className={styles.header}>
                    멤버쉽 추가하기
                </div>
                <div className={styles.contents}>
                    <div className={styles.title}>
                        이름 <span>*</span> <button className={styles.nameBtn} onClick={handleCheckName}>중복 검사</button>
                    </div>
                    <div className={styles.input}>
                        <input type="text" placeholder='이름을 입력해주세요' name='name' value={data.name} onChange={handleData} />
                        {(<button className={data.title !== '' ? styles.cancel : styles.hidden} onClick={(e) => { handleInputDelete(e, 'title') }}>X</button>)}
                    </div>
                    <div>
                        {data.name === '' ? <span>30자 이내로 입력해주세요.</span> : (regexData.name ? (regexData.nameCheck ? (<span style={{ color: 'blue' }}>사용가능한 이름입니다.</span>) : (<span>중복검사를 해주세요.</span>)) : (<span>30자 이내로 적어주세요</span>))}
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.title}>
                        조건(원) <span>*</span>
                    </div>
                    <div className={styles.input}>
                        <input type="text" placeholder='최소 포인트 조건을 입력해주세요' value={viewMinPoint} name='min_point' onChange={handleData} />
                    </div>
                    <div>
                        {data.min_point === 0 ? <span>최소 포인트 조건을 입력해주세요</span> : (regexData.min_point ? (<span style={{ color: 'blue' }}>입력 완료 되었습니다.</span>) : (<span>숫자가 너무 큽니다.</span>))}
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.title}>
                        혜택(%) <span>*</span>
                    </div>
                    <div className={styles.input}>
                        <input type="text" placeholder='혜택을 설정해주세요' value={viewBenefits} name='benefits' onChange={handleData} />
                    </div>
                    <div>
                        {data.benefits === 0 ? <span>혜택을 설정해주세요(%)</span> : (regexData.benefits ? (<span style={{ color: 'blue' }}>입력 완료 되었습니다.</span>) : (<span>숫자가 너무 큽니다.</span>))}
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.title}>
                        등급 순서 <span>*</span>
                    </div>
                    <div className={styles.input}>
                        <select className={styles.select} value={data.grade_order} onChange={handleChange}>
                           
                            {
                                grade.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                             {index===0&&(<option value={item.grade_order} style={{color:'red'}}>{`${index}. 선택`}</option>)}
                                            <option value="" style={{pointerEvents:'none'}} disabled={true}>{item.name}</option>
                                            <option value={item.grade_order+1} style={{color:'red'}}>{`${index+1}. 선택`}</option>
                                        </React.Fragment>

                                    )
                                })
                            }
                        </select>
                    </div>
                    {data.grade_order === '' ? <span>등급 순서를 선택해주세요 </span> : (regexData.grade_order ? (<span style={{ color: 'blue' }}>선택 완료되었습니다.</span>) : (<span>선택해 주세요.</span>))}
                </div>

                <div className={styles.contents}>
                    <div className={styles.btnForm}>
                        <div className={styles.confirmReverse}>
                            <button onClick={handleCancel}>취소하기</button>
                        </div>
                        <div className={checkAll ? styles.confirmReverse : styles.confirm}>
                            <button onClick={() => { SweetAlert('warning', '등급', '추가 하시겠습니까?', handleConfirm) }}>추가하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddForm