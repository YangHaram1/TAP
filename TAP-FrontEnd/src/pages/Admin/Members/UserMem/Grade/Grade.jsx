import React from 'react';
import styles from './Grade.module.css'; // CSS 모듈 import

const Grade = ({ grades, selectedGrade, onGradeChange }) => {
    return (
        <div className={styles.selectContainer}>
            <select
                name="grade"
                value={selectedGrade}
                onChange={onGradeChange}
                className={styles.gradeSelect}
            >
                <option value="">등급 선택</option>
                {grades.map((grade) => (
                    <option key={grade.SEQ} value={grade.SEQ}>
                        {grade.NAME} {/* GRADE_NAME 대신 NAME */}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default Grade;