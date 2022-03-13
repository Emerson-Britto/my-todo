import React/*, { useState, useEffect }*/ from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccessFormProvider } from 'common/contexts/accessForm';
import { ToDoProvider } from 'common/contexts/toDo';
import { AccessForm, ToDo } from 'pages';

const AppRoutes = () => {

	return (
		<BrowserRouter>
			<AccessFormProvider>
			  <Routes>
			    <Route exact={true} path='/' element={<AccessForm/>}/>
			  </Routes>
			</AccessFormProvider>
			<ToDoProvider>
				<Routes>
			    <Route path='/app/*' element={<ToDo/>}/>
			  </Routes>
		  </ToDoProvider>
		</BrowserRouter>
	);
}

export default AppRoutes;
