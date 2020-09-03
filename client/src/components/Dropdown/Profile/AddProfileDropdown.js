import React, { useRef, useEffect, useCallback } from 'react';
import IntroCard from '../../Card/Profile/Intro/IntroCard';
import EducationCard from '../../Card/Profile/Background/EducationCard';
import ExperienceCard from '../../Card/Profile/Background/ExperienceCard';
import AccomplishmentsCard from '../../Card/Profile/Accomplishments/AccomplishmentsCard';
import AboutMeCard from '../../Card/Profile/About/AboutMeCard';
import './AddProfileDropdown.css';

const AddProfileDropdown = ({ showDropdown, setShowDropdown }) => {
  const ref = useRef(null);
  const escapeListener = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        return () => setShowDropdown(false);
      }
    },
    [setShowDropdown]
  );
  const clickListener = useCallback(
    (e) => {
      if (ref.current.contains(e.target)) {
        return () => setShowDropdown(false);
      }
    },
    [ref.current, setShowDropdown]
  );
  useEffect(() => {
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, []);

  return (
    <div className="profile-dropdown__content" ref={ref}>
      <IntroCard />
      <AboutMeCard />
      <EducationCard />
      <ExperienceCard />
      <AccomplishmentsCard />
    </div>
  );
};

export default AddProfileDropdown;
