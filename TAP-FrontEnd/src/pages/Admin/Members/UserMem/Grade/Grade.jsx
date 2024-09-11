import React from 'react';
import styles from './Grade.module.css';

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
                    <option key={grade.seq} value={grade.seq}>
                        {grade.name} {/* `name`으로 표시 */}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Grade;
