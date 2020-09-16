## User Guide
The data exploration part by R will be shown in the pdf format file named as COVID_DATA_exploration. 
Open the html document called “index.html” with a standard web browser (chrome or firefox), you will see a web page containing three main sections. Shown as below
![(PLOT0: First-one secontion is shown as a global situation)](/Plot_fold/Picture0.png)
# 2020-COVID-19-data-visualisation
COVID-19 has become a serious problem worldwide. So far, many countries are still trying to control the spread of this disease. In order to suppress the spread of the disease as soon as possible, many countries including Australia, are also studying vaccines against covid-19. Thus, by analysing patient information in various countries, such as age, sex, travel history, etc., to study which factors of patients are most important or what the conditions of patients are the most likely to be infected. Based on the open data collected, I will show the situation of this virus in the world and typical countries through data visualization in three parts to public. First part, I will show the top 15 countries and their number of confirm cases over time. Second part, analysing South Korea patients’ information, the relationship between age and confirm number in each province and whether temperate impacts the number of recovered patients. The last part, by comparing age group and sex and travel history of South Korean and Canadian patients, visualizing to show which people with the conditions have a greater risk of infection.
## Global situation
In the “Global Cases” part, when user click the “start animate” bottom, the dynamic graph
will be shown on the screen, the rank of countries’ confirm cases will changes with time goes. The number of confirm cases of each country shows on the right of each bar. The graph is shown as below.
![(PLOT1: First secontion is shown as a global situation)](/Plot_fold/Picture1.png)
After clicking “start animate”, over time, the number of confirmed cases in each country is increasing, as is the length of the bar. When mouse hover on the bar, the number of confirm case and its country will be shown in the text box.
![(PLOT2: Second secontion is shown as a global situation implementation)](/Plot_fold/Picture2.png)
## South Korea situation
The graph below is about the relationship between the number of confirm cases and infection reason in South Korea.
![(PLOT3: Third secontion is shown as a South Korea situation)](/Plot_fold/Picture3.png)
On the map, each province has a different colour circle, the size of circle represents the number of confirm cases, the bigger the circle, the more confirm cases in this province. When mouse hover on the circle, the bar chart of infection reason is shown. As figure shown, when mouse hover on the purple circle, the bar chart shows that the largest number of patients is infected by “overseas inflow”, following by “contact with patient” and “Itaewon Clubs” in this province.
The graph below is about the relationship between temperature and patients’ status. User can select any province they want to see above, and the temperature line chart of the corresponding province is shown below. When user’s mouse hover on one point of the line, there is a pie chart showing the new isolated, new released and new deceased patients on that day. I choose one province with a large temperature fluctuation in order to show the effect of rising temperature on the number of people recovered. The graph shows that there are many patients are recovered after temperature increasing.
![(PLOT4: Forth secontion is shown as a South Korea situation implementation)](/Plot_fold/Picture4.png)
## Comparison of Canadian and South Korean patients
In this part, the graph shows comparison of gender, age group and travel or not of South Korea and Canadian patients.
![(PLOT5: Fifth secontion is shown as the comparison of Canadian and South Korean patients)](/Plot_fold/Picture5.png)
As figure shown, the left side shows the number of patients in each age group in Canada, for each bar, the different colour of each bar shows the percentage of patients travel or not. When user’s mouse hover on one bar, the pie chart of gender percentage will show to users. From the graph, we could see that the largest number of Korean age group is 20s, however, it’s 50s in Canada. Also, in Korea, most patients don’t have overseas travel history, but the percentage of having overseas travel is about half in each age group in Canada, except 10s and 90s. In Canada and South Korea, the ratio of men to women in the most age group is similar, except that in one or two groups there are slightly more men than women.
## Conclusion
By implement all the visualisations of the design, I find out that in some countries the COVID- 19 situation becomes worse and worse although they control the virus spread at the beginning, however, some countries situation becomes better and better by wise control and policy.
By visualizing the South Korean patients’ information, I find out that in the provinces where the COVID-19 is most severe, most of the patients be infected caused by overseas travel, but in other province most patients were infected by contacting with patients or went to crowded public places. This proves many countries’ policy that people should not gather in public in order to control the spread of virus. Although in temperature line chart, there are large number of covered cases at some points, it still needs more countries data to prove that since there might many other factors impact the patients’ covered number.
By comparing South Korean and Canadian patients’ information, it is clearly that gender is not the main factor affecting people be infected, but age is. Although the age group of major patients in each country is different, South Korea and Canada have a very vulnerable age group. Whether overseas history is an influencing factor depends on the situation in different countries.
Due to the time limitation, the UI and layout of web page are so good. But I know how to improve my knowledge and technologies in the data visualization filed in the future.
