//package com.ssafy.config;
//
//import com.ssafy.api.controller.auth.AuthenticationInterceptor;
//import com.ssafy.api.controller.auth.GetAuthenticationInterceptor;
//import com.ssafy.api.controller.auth.LoginMemberArgumentResolver;
//import com.ssafy.api.service.AuthService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//import org.springframework.web.method.support.HandlerMethodArgumentResolver;
//
//import java.util.List;
//
//@Configuration
//public class WebMvcConfig implements WebMvcConfigurer {
//
//    private final AuthService authService;
//
//    public WebMvcConfig(AuthService authService) {
//        this.authService = authService;
//    }
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedMethods("GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS")
//                .allowedHeaders("*")
//                .allowedOrigins("*")
//                .exposedHeaders("*");
//
//        WebMvcConfigurer.super.addCorsMappings(registry);
//    }
//
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new AuthenticationInterceptor(authService))
//                .addPathPatterns("/teachers", "/teachers/me", "/members/me", "/reviews", "/reviews/**", "/logout", "/notifications/**");
//        registry.addInterceptor(new GetAuthenticationInterceptor(authService))
//                .addPathPatterns("/reviews/student/**", "/members/me", "/subscribe", "/notifications");
//    }
//
//    @Override
//    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
//        resolvers.add(new LoginMemberArgumentResolver(authService));
//    }
//}
//
//
////@RequiredArgsConstructor
//////@Configuration
////public class WebMvcConfig implements WebMvcConfigurer {
////
////    @Override
////    public void addCorsMappings(CorsRegistry registry) {
////        registry.addMapping("/**")
////                .allowedOrigins("http://localhost:3000")
////                .allowedMethods("OPTIONS", "GET", "POST", "PATCH", "DELETE")
////                .allowedHeaders("*")
////                .exposedHeaders(HttpHeaders.AUTHORIZATION)
////                .allowCredentials(true);
////    }
////}