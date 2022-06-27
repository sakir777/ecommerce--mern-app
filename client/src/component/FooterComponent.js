import React from 'react'

const FooterComponent = () => {
  return (
    <>
<div>
  <footer class="footer">
  <div class="footer__addr">
    <h1 class="footer__logo">Fashion Space</h1>
        
    <h2>Contact</h2>
    
    <address>
      5534 Somewhere In. The World 22193-10212<br></br>
          
      <a class="footer__btn" href="mailto:sakirshaikh0777@gmail.com">Email Us</a>
    </address>
  </div>
  
  <ul class="footer__nav">
    
    <li class="nav__item nav__item--extra">
      <h2 class="nav__title">Technology</h2>
      
      <ul class="nav__ul nav__ul--extra">
        <li>
          <a href="#">Hardware Design</a>
        </li>
        
        <li>
          <a href="#">Software Design</a>
        </li>
        
        <li>
          <a href="#">Digital Design</a>
        </li>
        
        <li>
          <a href="#">Automation</a>
        </li>
        
        <li>
          <a href="#">Artificial Intelligence</a>
        </li>
        
        <li>
          <a href="#">IoT</a>
        </li>
      </ul>
    </li>
    
    <li className="nav__item">
      <h2 className="nav__title">Legal</h2>
      
      <ul className="nav__ul">
        <li>
          <a href="#">Privacy Policy</a>
        </li>
        
        <li>
          <a href="#">Terms of Use</a>
        </li>
        
        <li>
          <a href="#">Sitemap</a>
        </li>
      </ul>
    </li>
  </ul>
  
  <div class="legal">
    <p>&copy; 2022 Something. All rights reserved.</p>
  </div>
</footer>
  </div>
    </>
  )
}

export default FooterComponent