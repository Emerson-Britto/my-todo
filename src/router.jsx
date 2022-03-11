import React/*, { useState, useEffect }*/ from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccessFormProvider } from 'common/contexts/accessForm';
import { AccessForm, ToDo } from 'pages';

const AppRoutes = () => {

	return (
		<BrowserRouter>
			<AccessFormProvider>
			  <Routes>
			    <Route exact={true} path='/' element={<AccessForm/>}/>
			  </Routes>
			</AccessFormProvider>
			<Routes>
		    <Route path='/app/:category' element={<ToDo/>}/>
		  </Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;
