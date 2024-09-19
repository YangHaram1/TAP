import styles from './AddForm.module.css';
import Mybutton from './../../../../MyButton/Mybutton';
import { useEffect, useState } from 'react';
import { api } from './../../../../../../../config/config';
import Swal from 'sweetalert2';

const AddForm = ({ setCheck, setList }) => {
    const [data, setData] = useState({
        seq: '',
        member_id: '',
        address: '',
        detailed_address: '',
        zipcode: '',
        name: '',
        phone: ''
    });
    const [regexData, setRegexData] = useState({
        name: false,
        phone: false,
        address: false,
        detailed_address: false,
        zipcode: false
    })
    const [checkAll, setCheckAll] = useState();
    useEffect(() => {
        const allTrue = Object.values(regexData).every(value => value === true);
        setCheckAll(allTrue)
        //  console.log(regexData)
    }, [regexData])

    const handleConfirm = () => {
        api.post(`/delivery`, data).then((resp) => {
            setCheck(false);
            setList((prev) => {
                return [...prev, { ...data, seq: resp.data }]
            })
            Swal.fire({
                icon: 'success',
                title: '배송',
                text: '배송지가 추가 됬습니다.'
            })
        })
    }

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setData(prev => ({
                    ...prev,
                    zipcode: data.zonecode,
                    address: data.address,
                }))
                setRegexData((prev) => {
                    return { ...prev, zipcode: true, address: true }
                })
            },
        }).open()
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return { ...prev, [name]: value };
        })

        if (name === 'name') {//한글 2-5글자 사이 정규식
            const regex = /^[가-힣]{2,5}$/;
            setRegexData((prev) => {
                return { ...prev, [name]: regex.test(value) }
            })
        }
        else if (name === 'detailed_address') {//960704
            const regex = /^[a-zA-Z0-9가-힣\s\-\.]+$/;
            setRegexData((prev) => {
                return { ...prev, [name]: regex.test(value) }
            })

        }
        else if (name === 'phone') {//010-1111-1111
            const phoneRegex = /^010-\d{4}-\d{4}$/;
            setRegexData((prev) => {
                return { ...prev, [name]: phoneRegex.test(value) }
            })
        }
    }

    // useEffect(() => {
    //     console.log(data);
    // }, [data])
    return (
        <div className={styles.container}>
            <div className={styles.input}>
                <div className={styles.contents}>
                    <div className={styles.content1}>
                        우편번호 <span style={{ fontSize: '15px' }}>*</span>
                    </div>
                    <div className={styles.content2}>
                        <input type="text" value={data.zipcode} disabled={true} />
                        <button className={styles.addressBtn} onClick={handleAddressSearch}>
                            주소 검색
                        </button>
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.content1}>
                        기본주소 <span style={{ fontSize: '15px' }}>*</span>
                    </div>
                    <div className={styles.content2}>
                        <input type="text" value={data.address} disabled={true} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.content1}>
                        상세주소 <span style={{ fontSize: '15px' }}>*</span>
                    </div>
                    <div className={styles.content3}>
                        <input type="text" value={data.detailed_address} placeholder='상세주소를 입력해주세요.' name='detailed_address' onChange={handleChange} />
                        {data.detailed_address === '' ? <span>입력해주세요.</span> : (regexData.detailed_address ? (<span style={{ color: 'blue' }}>입력이 완료되었습니다.</span>) : (<span>{`정확히 입력해주세요`}</span>))}
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.content1}>
                        수령인 <span style={{ fontSize: '15px' }}>*</span>
                    </div>
                    <div className={styles.content3}>
                        <input type="text" name='name' value={data.name} onChange={handleChange} placeholder='받으실분 성함을 입력해주세요.' />
                        {data.name === '' ? <span>입력해주세요.</span> : (regexData.name ? (<span style={{ color: 'blue' }}>입력이 완료되었습니다.</span>) : (<span>{`2~5이내 입력`}</span>))}
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.content1}>
                        휴대폰번호 <span style={{ fontSize: '15px' }}>*</span>
                    </div>
                    <div className={styles.content3}>
                        <input type="text" placeholder='ex) 010-1111-1111' name='phone' value={data.phone} onChange={handleChange} />

                        {data.phone === '' ? <span>입력해주세요.</span> : (regexData.phone ? (<span style={{ color: 'blue' }}>입력이 완료되었습니다.</span>) : (<span>{`번호사이에 - 포함`}</span>))}                    </div>
                </div>
                <div className={styles.contents}>
                    <Mybutton setcheck={setCheck} handleConfirm={handleConfirm} checkAll={checkAll} />
                </div>
            </div>
        </div>
    )
}
export default AddForm;