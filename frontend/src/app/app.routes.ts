import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '' , loadComponent : ()=>import('./page/home/home.component').then( c=>c.HomeComponent ) },
    { path: 'about' , loadComponent : ()=>import('./page/about/about.component').then( c=>c.AboutComponent ) },
    { path: 'questions' , loadComponent : ()=>import('./page/questions/questions.component').then( c=>c.QuestionsComponent) },
    { path: 'services' , loadComponent : ()=>import('./page/services/services.component').then( c=>c.ServicesComponent ) },
    { path: 'servicedetails/:id' , loadComponent : ()=>import('./page/services-details/services-details.component').then( c=>c.ServicesdetailsComponent ) },

    { path: 'login'  , loadComponent : ()=>import('./page/login/login.component').then( c=>c.LoginComponent ) },
    { path: 'register'  , loadComponent : ()=>import('./page/register/register.component').then( c=>c.RegisterComponent ) },
    
    
    { path: 'client' , loadComponent : ()=>import('./page/client/client.component').then( c=>c.ClientComponent ) , children: [

        { path: '' , loadComponent : ()=>import('./page/client/stats/stats.component').then( c=>c.StatsComponent ) },
        { path: 'profile' , loadComponent : ()=>import('./page/client/profile/profile.component').then( c=>c.ProfileComponent ) },
        { path: 'my-services' , loadComponent : ()=>import('./page/client/my-services/my-services.component').then( c=>c.MyServicesComponent ) },
        { path: 'my-proposals' , loadComponent : ()=>import('./page/client/proposals/proposals.component').then( c=>c.ProposalsComponent ) },
        { path: 'post' , loadComponent : ()=>import('./page/client/post/post.component').then( c=>c.PostComponent ) },
        { path: 'service-proposals/:id' , loadComponent : ()=>import('./page/client/service-proposals/service-proposals.component').then( c=>c.ServiceProposalsComponent ) },


    ] },
]; 
