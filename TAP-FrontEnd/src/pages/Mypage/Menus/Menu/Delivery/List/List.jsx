import Swal from 'sweetalert2';
import { api } from '../../../../../../config/config';
import AddForm from './AddForm/AddForm';
import styles from './List.module.css';
import React, { useEffect, useState } from 'react';
const List = () => {
    const [check, setCheck] = useState(false);
    const [list, setList] = useState([]);
    const [checked, setChecked] = useState([]);
    const [checkBox, setCheckBox] = useState(false);
    const [defaultCheckBox, setDefaultCheckBox] = useState(false);
    const [deleteSeq, setDeleteSeq] = useState([]);
    const [seq, setSeq] = useState(null);
    const [address,setAddress]=useState(null);

    useEffect(() => {
        api.get(`/delivery`).then((resp) => {
            setList(resp.data);
            setChecked((prev) => {
                return resp.data.map(() => { return false })
            })
        })

        api.get(`/delivery/default`).then((resp) => {
            setAddress(resp.data);
        })
      
    }, [])

    const handleDelivery = () => {
        if (list.length > 9) {
            Swal.fire({
                icon: 'error',
                title: '배송',
                text: '최대 10개까지만 저장가능합니다'
            })
        }
        else {
            setCheck(true);
        }

    }
    const handleChange = (e, index, seq) => {
        setChecked((prev) => {
            prev[index] = e.target.checked;
            return prev;
        })
        if (e.target.checked) {
            // 체크가 되었을 때 seq 추가
            setDeleteSeq((prev) => {
                return [...prev, seq]
            });
        } else {
            // 체크가 해제되었을 때 seq 제거
            setDeleteSeq((prev) => {
                return prev.filter((item) => item !== seq);
            });
        }
        console.log(e.target.checked)
    }
    const handleDeleteBtn = () => {
        setCheckBox(true)
        setDefaultCheckBox(false);
    }
    const handleDelete = () => {
        const jsonStr = JSON.stringify(deleteSeq)
        if (deleteSeq.length > 0)
            api.delete(`/delivery`, { data: jsonStr }).then((resp) => {
                setList((prev) => {
                    const result = prev.filter((item, index) => {
                        return !checked[index]
                    })
                    setCheckBox(false);
                    return result;

                })
                api.get(`/delivery/default`).then((resp) => {
                    setAddress(resp.data);
                })
                Swal.fire({
                    icon: 'success',
                    title: '배송',
                    text: '삭제가 완료됬습니다.'
                })
            })
        else {
            Swal.fire({
                icon: 'error',
                title: '배송',
                text: '1개이상 체크 해주세요.'
            })
        }
    }
    const handleCancle = () => {
        setCheckBox(false);
        setChecked((prev) => {
            return list.map(() => { return false })
        })

    }
    useEffect(() => {
        if (!checkBox) { //fasle 이면 
            setDeleteSeq([]);
        }
    }, [checkBox])

    useEffect(()=>{
        setChecked((prev) => {
            return prev.map(() => { return false })
        })
    },[list])

  

    ///
    const handleDefault = () => {
        setDefaultCheckBox(true);
        setCheckBox(false);
    }
    const handleCancleDefault = () => {
        setDefaultCheckBox(false);
    }
    const handleChangeDefault = (e, index, seq) => {
        setChecked((prev) => {
            return (
                prev.map((item, i) => {
                    if (i === index) return e.target.checked;
                    return false;
            }))
        })
        if (e.target.checked) {
            // 체크가 되었을 때 seq 추가
            setSeq(seq);
        } else {
            setSeq(null);
        }
        console.log(e.target.checked)
    }
    const handleConfirm = () => {
        const deliverySeq = seq;
        if (seq !== null)
            api.patch(`/members/${deliverySeq}`).then((reps) => {
                setDefaultCheckBox(false);
                setAddress(()=>{
                    const result=   list.filter((item,index)=>{
                        if(item.seq===deliverySeq){
                            return true;
                        }
                        return false;
                    })
                    return result[0];
                })
            })
        else{
            Swal.fire({
                icon: 'error',
                title: '배송',
                text: '주소를 선택해주세요.'
            })
        }
    }
    useEffect(() => {
        setChecked((prev) => {
            return list.map(() => { return false })
        })
        setSeq(null);

    }, [defaultCheckBox])

    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        {!checkBox ? "나의 주소록은 최대 10개까지 저장할 수 있습니다." : '삭제할 주소를 선택해주세요.'}
                    </div>
                    <div>
                        {!checkBox && (<button onClick={handleDelivery}>+ 새 배송지 추가</button>)}
                        {checkBox && (<button onClick={handleCancle}>취소</button>)}
                        {!checkBox && (<button onClick={handleDeleteBtn}>- 배송지 삭제</button>)}
                        {checkBox && (<button onClick={handleDelete}>삭제</button>)}
                    </div>
                </div>
                <div className={styles.header}>
                    <div>
                        {(address!==null && address!=='')?`기본 배송지 : ${address.address} ${address.detailed_address}`:'기본 주소록이 없습니다.'}
                    </div>
                    <div>
                        {defaultCheckBox && (<button onClick={handleCancleDefault}>취소</button>)}
                        {!defaultCheckBox && (<button onClick={handleDefault}>설정하기</button>)}
                        {defaultCheckBox && (<button onClick={handleConfirm}>확인</button>)}
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.type}>
                        <div className={styles.address}>
                            주소
                        </div>
                        <div className={styles.zipcode}>
                            우편번호
                        </div>
                        <div className={styles.name}>
                            이름
                        </div>
                        <div className={styles.phone}>
                            번호
                        </div>
                    </div>
                    {
                        list.map((item, index) => {

                            return (
                                <div className={styles.contents} key={index}>
                                    <div className={styles.address}>
                                        <div>

                                            {checkBox && (<input type="checkbox" checked={checked[index]} onChange={(e) => handleChange(e, index, item.seq)} />)}
                                            {defaultCheckBox && (<input type="checkbox" checked={checked[index]}  disabled={item.seq===address.seq} onChange={(e) => handleChangeDefault(e, index, item.seq)} />)}
                                            {item.address}
                                        </div>
                                        <div>
                                            {item.detailed_address}
                                        </div>
                                    </div>
                                    <div className={styles.zipcode}>
                                        {item.zipcode}
                                    </div>
                                    <div className={styles.name}>
                                        {item.name}
                                    </div>
                                    <div className={styles.phone}>
                                        {item.phone}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {check && (<AddForm setCheck={setCheck} setList={setList} />)}
        </React.Fragment>

    )
}
export default List;