package com.mango.smart.config.web;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.ClassPathResource;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
@PropertySource("classpath:/application.properties")
public class DatabaseConfig {

    @Autowired
    private ApplicationContext context;

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.hikari")
    HikariConfig hikariConfig() {
        return new HikariConfig();
    }

    @Bean
    DataSource dataSource() {
        return new HikariDataSource(hikariConfig());
    }

    @Bean
    SqlSessionFactory sqlSessionFactory() throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setDataSource(dataSource());
        factoryBean.setMapperLocations(
                context.getResources("classpath:/mybatis/mapper/**/*Mapper.xml"));
        factoryBean.setConfigLocation(new ClassPathResource("mybatis/mybatis-config.xml"));
        // factoryBean.setConfiguration(mybatisConfig());
        return factoryBean.getObject();
    }

    @Bean
    SqlSessionTemplate sqlSession() throws Exception {
        return new SqlSessionTemplate(sqlSessionFactory());
    }

    // @Bean
    // @ConfigurationProperties(prefix = "mybatis.configuration")
    // public org.apache.ibatis.session.Configuration mybatisConfig() {
    // return new org.apache.ibatis.session.Configuration();
    // }

}
