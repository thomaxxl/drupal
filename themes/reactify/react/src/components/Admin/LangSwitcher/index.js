import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faLanguage} from "@fortawesome/fontawesome-free-solid/index";
import './style.scss'

const LangSwitcher = ({language, changeLanguage}) => {

  const toggleLangSwitcher = ev => {
    const langItems = document.querySelector('.lang-switcher--items')
    langItems.classList.toggle('open')
  }

  return (
      <div className="lang-switcher">
        <span onClick={ ev => {toggleLangSwitcher(ev)}}><FontAwesomeIcon icon={faLanguage} />{language}</span>

        <ul className="lang-switcher--items">
          <li onClick = {changeLanguage('en')}>English</li>
          <li onClick = {changeLanguage('ru')}>Russian</li>
          <li onClick = {changeLanguage('fi')}>Finnish</li>
        </ul>
      </div>
  )
}

export default LangSwitcher