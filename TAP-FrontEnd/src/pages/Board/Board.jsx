import React, { useEffect, useState } from 'react'
import styles from './Board.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { api } from '../../config/config'
const Board = () => {
    const [list, setList] = useState([
        //         {
        //             title: '8월 시스템 공지',
        //             contents: `안녕하세요 인터파크 티켓입니다.
        // 보다 안정적이고 효율적인 서비스 제공을 위하여 아래와 같이 티켓 시스템 점검 작업으로 서비스가 일시 중단될 예정입니다.
        // 아래 내용을 참고하시어, 이용에 착오 없으시기 바랍니다.
        // ----- 아 래 -----
        // 1. 작업시간 : 2024.08.29 (목) 01:00 ~ 07:00
        // 2. 작업내용 : 시스템 정기점검
        // * 해당 작업 시간 동안 인터파크 티켓 / PlayDB 사이트 서비스 이용 불가
        // (해당 작업은 작업상태에 따라 단축되거나 연장될 수 있음을 감안하여 주시기 바랍니다.)
        // 점검이 끝나는 대로 서비스를 정상적으로 재개하도록 하겠습니다. 이용에 불편을 드려 죄송합니다.
        // 항상 고객님께 최선의 서비스를 제공하기 위해 노력하는 인터파크 티켓이 되겠습니다.
        // 감사합니다.`,
        //             write_date: '2024-07-05',
        //         },
        //         {
        //             title: '8월 시스템 공지2',
        //             contents: `안녕하세요, 인터파크 티켓입니다.
        // 쾌적한 예매 환경을 만들고, 무분별한 부정 예매 시도를 방지하기 위해 예매 방법이 일부 변경되었습니다.
        // 아래의 변경 내용을 참고하여 이용에 불편함이 없으시길 바랍니다.
        // 변경 내용:
        //     • 한 개의 계정으로 한 개의 대기열 순번만 받을 수 있습니다.
        //     • 여러 디바이스나 브라우저를 이용해서 동시에 대기열을 생성할 경우, 기존 대기열은 자동으로 종료됩니다.
        //     • 예매율을 확인할 수 있는 상품에서는 전체 좌석의 90% 이상이 결제 완료되면 예매율이 표시됩니다.
        // ※ 자세한 내용은 FAQ를 참고해주시기 바랍니다. (FAQ 바로가기: https://help.interpark.com/ticket/faq?category=TICKET_TICKET )
        // 인터파크 티켓은 최고의 서비스를 제공하기 위해 항상 노력하겠습니다.
        // 감사합니다..`,
        //             write_date: '2024-08-15',
        //         },
        //         {
        //             title: '8월 시스템 공지2',
        //             contents: `안녕하세요, 인터파크 티켓입니다.
        // 쾌적한 예매 환경을 만들고, 무분별한 부정 예매 시도를 방지하기 위해 예매 방법이 일부 변경되었습니다.
        // 아래의 변경 내용을 참고하여 이용에 불편함이 없으시길 바랍니다.
        // 변경 내용:
        //     • 한 개의 계정으로 한 개의 대기열 순번만 받을 수 있습니다.
        //     • 여러 디바이스나 브라우저를 이용해서 동시에 대기열을 생성할 경우, 기존 대기열은 자동으로 종료됩니다.
        //     • 예매율을 확인할 수 있는 상품에서는 전체 좌석의 90% 이상이 결제 완료되면 예매율이 표시됩니다.
        // ※ 자세한 내용은 FAQ를 참고해주시기 바랍니다. (FAQ 바로가기: https://help.interpark.com/ticket/faq?category=TICKET_TICKET )
        // 인터파크 티켓은 최고의 서비스를 제공하기 위해 항상 노력하겠습니다.
        // 감사합니다..`,
        //             write_date: '2024-08-15',
        //         },
        //         {
        //             title: '8월 시스템 공지2',
        //             contents: `안녕하세요, 인터파크 티켓입니다.
        // 쾌적한 예매 환경을 만들고, 무분별한 부정 예매 시도를 방지하기 위해 예매 방법이 일부 변경되었습니다.
        // 아래의 변경 내용을 참고하여 이용에 불편함이 없으시길 바랍니다.
        // 변경 내용:
        //     • 한 개의 계정으로 한 개의 대기열 순번만 받을 수 있습니다.
        //     • 여러 디바이스나 브라우저를 이용해서 동시에 대기열을 생성할 경우, 기존 대기열은 자동으로 종료됩니다.
        //     • 예매율을 확인할 수 있는 상품에서는 전체 좌석의 90% 이상이 결제 완료되면 예매율이 표시됩니다.
        // ※ 자세한 내용은 FAQ를 참고해주시기 바랍니다. (FAQ 바로가기: https://help.interpark.com/ticket/faq?category=TICKET_TICKET )
        // 인터파크 티켓은 최고의 서비스를 제공하기 위해 항상 노력하겠습니다.
        // 감사합니다..`,
        //             write_date: '2024-08-15',
        //         },
        //         {
        //             title: '8월 시스템 공지',
        //             contents: `안녕하세요 인터파크 티켓입니다.
        // 보다 안정적이고 효율적인 서비스 제공을 위하여 아래와 같이 티켓 시스템 점검 작업으로 서비스가 일시 중단될 예정입니다.
        // 아래 내용을 참고하시어, 이용에 착오 없으시기 바랍니다.
        // ----- 아 래 -----
        // 1. 작업시간 : 2024.08.29 (목) 01:00 ~ 07:00
        // 2. 작업내용 : 시스템 정기점검
        // * 해당 작업 시간 동안 인터파크 티켓 / PlayDB 사이트 서비스 이용 불가
        // (해당 작업은 작업상태에 따라 단축되거나 연장될 수 있음을 감안하여 주시기 바랍니다.)
        // 점검이 끝나는 대로 서비스를 정상적으로 재개하도록 하겠습니다. 이용에 불편을 드려 죄송합니다.
        // 항상 고객님께 최선의 서비스를 제공하기 위해 노력하는 인터파크 티켓이 되겠습니다.
        // 감사합니다.`,
        //             write_date: '2024-07-05',
        //         },
        //         {
        //             title: '8월 시스템 공지2',
        //             contents: `안녕하세요, 인터파크 티켓입니다.
        // 쾌적한 예매 환경을 만들고, 무분별한 부정 예매 시도를 방지하기 위해 예매 방법이 일부 변경되었습니다.
        // 아래의 변경 내용을 참고하여 이용에 불편함이 없으시길 바랍니다.
        // 변경 내용:
        //     • 한 개의 계정으로 한 개의 대기열 순번만 받을 수 있습니다.
        //     • 여러 디바이스나 브라우저를 이용해서 동시에 대기열을 생성할 경우, 기존 대기열은 자동으로 종료됩니다.
        //     • 예매율을 확인할 수 있는 상품에서는 전체 좌석의 90% 이상이 결제 완료되면 예매율이 표시됩니다.
        // ※ 자세한 내용은 FAQ를 참고해주시기 바랍니다. (FAQ 바로가기: https://help.interpark.com/ticket/faq?category=TICKET_TICKET )
        // 인터파크 티켓은 최고의 서비스를 제공하기 위해 항상 노력하겠습니다.
        // 감사합니다..`,
        //             write_date: '2024-08-15',
        //         },
        //         {
        //             title: '8월 시스템 공지2',
        //             contents: `안녕하세요, 인터파크 티켓입니다.
        // 쾌적한 예매 환경을 만들고, 무분별한 부정 예매 시도를 방지하기 위해 예매 방법이 일부 변경되었습니다.
        // 아래의 변경 내용을 참고하여 이용에 불편함이 없으시길 바랍니다.
        // 변경 내용:
        //     • 한 개의 계정으로 한 개의 대기열 순번만 받을 수 있습니다.
        //     • 여러 디바이스나 브라우저를 이용해서 동시에 대기열을 생성할 경우, 기존 대기열은 자동으로 종료됩니다.
        //     • 예매율을 확인할 수 있는 상품에서는 전체 좌석의 90% 이상이 결제 완료되면 예매율이 표시됩니다.
        // ※ 자세한 내용은 FAQ를 참고해주시기 바랍니다. (FAQ 바로가기: https://help.interpark.com/ticket/faq?category=TICKET_TICKET )
        // 인터파크 티켓은 최고의 서비스를 제공하기 위해 항상 노력하겠습니다.
        // 감사합니다..`,
        //             write_date: '2024-08-15',
        //         },
        //         {
        //             title: '8월 시스템 공지2',
        //             contents: `안녕하세요, 인터파크 티켓입니다.
        // 쾌적한 예매 환경을 만들고, 무분별한 부정 예매 시도를 방지하기 위해 예매 방법이 일부 변경되었습니다.
        // 아래의 변경 내용을 참고하여 이용에 불편함이 없으시길 바랍니다.
        // 변경 내용:
        //     • 한 개의 계정으로 한 개의 대기열 순번만 받을 수 있습니다.
        //     • 여러 디바이스나 브라우저를 이용해서 동시에 대기열을 생성할 경우, 기존 대기열은 자동으로 종료됩니다.
        //     • 예매율을 확인할 수 있는 상품에서는 전체 좌석의 90% 이상이 결제 완료되면 예매율이 표시됩니다.
        // ※ 자세한 내용은 FAQ를 참고해주시기 바랍니다. (FAQ 바로가기: https://help.interpark.com/ticket/faq?category=TICKET_TICKET )
        // 인터파크 티켓은 최고의 서비스를 제공하기 위해 항상 노력하겠습니다.
        // 감사합니다..`,
        //             write_date: '2024-08-15',
        //         },
        //         {
        //             title: '8월 시스템 공지2',
        //             contents: `안녕하세요, 인터파크 티켓입니다.
        // 쾌적한 예매 환경을 만들고, 무분별한 부정 예매 시도를 방지하기 위해 예매 방법이 일부 변경되었습니다.
        // 아래의 변경 내용을 참고하여 이용에 불편함이 없으시길 바랍니다.
        // 변경 내용:
        //     • 한 개의 계정으로 한 개의 대기열 순번만 받을 수 있습니다.
        //     • 여러 디바이스나 브라우저를 이용해서 동시에 대기열을 생성할 경우, 기존 대기열은 자동으로 종료됩니다.
        //     • 예매율을 확인할 수 있는 상품에서는 전체 좌석의 90% 이상이 결제 완료되면 예매율이 표시됩니다.
        // ※ 자세한 내용은 FAQ를 참고해주시기 바랍니다. (FAQ 바로가기: https://help.interpark.com/ticket/faq?category=TICKET_TICKET )
        // 인터파크 티켓은 최고의 서비스를 제공하기 위해 항상 노력하겠습니다.
        // 감사합니다..`,
        //             write_date: '2024-08-15',
        //         },
        //         {
        //             title: '8월 시스템 공지2',
        //             contents: `안녕하세요, 인터파크 티켓입니다.
        // 쾌적한 예매 환경을 만들고, 무분별한 부정 예매 시도를 방지하기 위해 예매 방법이 일부 변경되었습니다.
        // 아래의 변경 내용을 참고하여 이용에 불편함이 없으시길 바랍니다.
        // 변경 내용:
        //     • 한 개의 계정으로 한 개의 대기열 순번만 받을 수 있습니다.
        //     • 여러 디바이스나 브라우저를 이용해서 동시에 대기열을 생성할 경우, 기존 대기열은 자동으로 종료됩니다.
        //     • 예매율을 확인할 수 있는 상품에서는 전체 좌석의 90% 이상이 결제 완료되면 예매율이 표시됩니다.
        // ※ 자세한 내용은 FAQ를 참고해주시기 바랍니다. (FAQ 바로가기: https://help.interpark.com/ticket/faq?category=TICKET_TICKET )
        // 인터파크 티켓은 최고의 서비스를 제공하기 위해 항상 노력하겠습니다.
        // 감사합니다..`,
        //             write_date: '2024-08-15',
        //         },
        //         {
        //             title: '8월 시스템 공지2',
        //             contents: `안녕하세요, 인터파크 티켓입니다.
        // 쾌적한 예매 환경을 만들고, 무분별한 부정 예매 시도를 방지하기 위해 예매 방법이 일부 변경되었습니다.
        // 아래의 변경 내용을 참고하여 이용에 불편함이 없으시길 바랍니다.
        // 변경 내용:
        //     • 한 개의 계정으로 한 개의 대기열 순번만 받을 수 있습니다.
        //     • 여러 디바이스나 브라우저를 이용해서 동시에 대기열을 생성할 경우, 기존 대기열은 자동으로 종료됩니다.
        //     • 예매율을 확인할 수 있는 상품에서는 전체 좌석의 90% 이상이 결제 완료되면 예매율이 표시됩니다.
        // ※ 자세한 내용은 FAQ를 참고해주시기 바랍니다. (FAQ 바로가기: https://help.interpark.com/ticket/faq?category=TICKET_TICKET )
        // 인터파크 티켓은 최고의 서비스를 제공하기 위해 항상 노력하겠습니다.
        // 감사합니다..`,
        //             write_date: '2024-08-15',
        //         },
    ])
    const [toggleTip, setToggleTip] = useState([])
    const [check, setCheck] = useState([])
    // const handleGet = () => {
    //     axios.get(`http://192.168.1.34/board`).then(resp => {
    //         console.log(resp.data)
    //         setList(resp.data)
    //     })
    // }
    useEffect(() => {
        setCheck(
            list.map(() => {
                return false
            })
        )
        setToggleTip(
            list.map(() => {
                return true
            })
        )
        api.get(`/board`).then(resp => {
            setList(resp.data)
        })
    }, [])

    const handleCheck = index => {
        setCheck(prev => {
            return prev.map((item, i) => {
                if (i === index) return !item //여기가 고정값을 무조건 true,false !item 토글 클릭할떄마다 바뀜

                return item // 나머지 배열값을 유지해줌.
            })
        })
    }

    const handleToggleTip = index => {
        setToggleTip(prev => {
            return prev.map((item, i) => (i === index ? !item : item))
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.mainTitle}>공지사항</div>
            {list.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        <div className={styles.contents}>
                            <div className={styles.showConts}>
                                <div className={styles.leftConts}>
                                    <div className={styles.title}>
                                        {item.title}
                                    </div>
                                    <div className={styles.write_date}>
                                        {item.write_date}
                                    </div>
                                </div>

                                <div className={styles.rightConts}>
                                    <div
                                        className={styles.toggleIcon}
                                        onClick={() => {
                                            handleCheck(index)
                                            handleToggleTip(index)
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                toggleTip[index]
                                                    ? faChevronDown
                                                    : faAngleUp
                                            }
                                            onClick={handleToggleTip}
                                        />
                                    </div>
                                </div>
                            </div>

                            {check[index] && (
                                <div className={styles.hideConts}>
                                    <div>{item.contents}</div>
                                </div>
                            )}
                        </div>
                    </React.Fragment>
                )
            })}
            <div className={styles.more}>더보기</div>
        </div>
    )
}
export default Board
