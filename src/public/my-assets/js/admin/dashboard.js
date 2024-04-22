$(document).ready(function () {
    // Chart Global Color
    Chart.defaults.color = "#6C7293";
    Chart.defaults.borderColor = "#FF7900";
    Chart.defaults.elements.bar.borderWidth = 1;

    const DashboardController = {
        contribution_faculties_chart: null,
        contribution_year_chart: null,
        percentage_contribution_chart: null,
        exception_comment_chart: null,
        contributor_chart: null,
        SetUpChart() {
            const ctx_article = $("#contribution_faculties_chart").get(0).getContext("2d");
            DashboardController.contribution_faculties_chart = new Chart(ctx_article, {
                type: "bar",
                data: {},
                options: {
                    responsive: true
                }
            });

            const ctx_contribution = $("#contribution_year_chart").get(0).getContext("2d");
            DashboardController.contribution_year_chart = new Chart(ctx_contribution, {
                type: "line",
                data: {},
                options: {
                    responsive: true
                }
            });

            const ctx_percentage_contribution = $("#percentage_contributions").get(0).getContext("2d");
            DashboardController.percentage_contribution_chart = new Chart(ctx_percentage_contribution, {
                type: "doughnut",
                data: {
                    datasets: [{
                        data: {},
                    }],
                    labels: [],
                },
                options: {
                    responsive: true,
                }
            });

            const ctx_comment = $("#exception_comment_chart").get(0).getContext("2d");
            DashboardController.exception_comment_chart = new Chart(ctx_comment, {
                type: "bar",
                data: {},
                options: {
                    responsive: true
                }
            });

            const ctx_contributor = $("#contributors_chart").get(0).getContext("2d");
            DashboardController.contributor_chart = new Chart(ctx_contributor, {
                type: "bar",
                data: {},
                options: {
                    responsive: true
                }
            });

        },
        EventListener() {
            $('#input_faculty').change(function () {
                const faculty_id = $(this).val()
                Loading(true)
                DashboardController.GetStatisticalContributeYears(faculty_id)
                    .then((response) => {
                        setTimeout(() => {
                            const {statistical_Contribute_year_data} = response
                            DashboardController.RenderContributeYearChart(statistical_Contribute_year_data)
                            Loading(false)
                        }, 1500)
                    })
            })

            $('#input_magazine').change(function () {
                const magazine_id = $(this).val()
                Loading(true)
                DashboardController.GetStatisticalContributionFaculties(magazine_id)
                    .then((response) => {
                        setTimeout(() => {
                            const {statistical_contribute_faculty_data} = response
                            DashboardController.RenderContributeFacultyAndPercentageChart(statistical_contribute_faculty_data)
                            Loading(false)
                        }, 1500)
                    })
            })

            $('#input_magazine_comment').change(function (){
                const magazine_id = $(this).val()
                Loading(true)
                DashboardController.GetStatisticalExceptionComment(magazine_id)
                    .then((response) => {
                        console.log(response);
                        setTimeout(() => {
                            const {article_without_comment_quantity, article_not_comment_after_14_day_quantity} = response
                        
                            DashboardController.RenderExceptionCommentChart(
                                article_without_comment_quantity,
                                article_not_comment_after_14_day_quantity)
                            Loading(false)
                        }, 1500)
                    }).catch(error=>{
                        console.log(error);
                    })
            })

            $('#input_magazine_contributor').change(function(){
                const magazine_id = $(this).val()
                Loading(true)
                DashboardController.GetStatisticalContributor(magazine_id)
                .then((response) => {
                    console.log(response);
                    setTimeout(() => {
                        const {statistical_contributor} = response
                    
                        DashboardController.RenderContributeContributorChart(statistical_contributor)
                        Loading(false)
                    }, 1500)
                }).catch(error=>{
                    console.log(error);
                })
            })
        },
        RenderContributeFacultyAndPercentageChart(statistical) {
            let contribute_faculty_labels = []
            let contribute_faculty_data = []
            statistical.map(data => {
                contribute_faculty_labels.push(data.faculty_name)
                contribute_faculty_data.push(data.article_quantity)
            })
            const data_chart = {
                labels: contribute_faculty_labels,
                datasets: [{
                    label: "Contribution",
                    data: contribute_faculty_data,
                    backgroundColor: "rgba(153, 102, 255, 0.2)",
                    borderColor: "rgb(153, 102, 255)"
                }]
            }
            DashboardController.contribution_faculties_chart.data = data_chart
            DashboardController.contribution_faculties_chart.update()
            let percentage_contribute_faculty_labels = []
            let percentage_contribute_faculty_data = []
            let total = 0
            statistical.map(data => {
                total += data.article_quantity
            })
            statistical.map(data => {
                percentage_contribute_faculty_labels.push(data.faculty_name)
                const percentage = (data.article_quantity / total) * 100
                    percentage_contribute_faculty_data.push(percentage)
            })

            const percentage_data_chart = {
                labels: percentage_contribute_faculty_labels,
                datasets: [{
                    label: "Contribution",
                    data: percentage_contribute_faculty_data,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(255, 25, 86)',
                        'rgb(25, 205, 86)',
                        'rgb(55, 05, 86)',
                        'rgb(255, 25, 6)',
                        'rgb(2, 5, 6)',
                    ],
                    hoverOffset: 4
                }]
            }

            DashboardController.percentage_contribution_chart.data = percentage_data_chart
            DashboardController.percentage_contribution_chart.update()
        },
        RenderContributeYearChart(statistical) {
            let contribute_years_labels = []
            let contribute_years_data = []
            statistical.map(data => {
                contribute_years_labels.push(data.academic_year)
                contribute_years_data.push(data.article_quantity)
            })
            const data_chart = {
                labels: contribute_years_labels,
                datasets: [{
                    label: "Contribution",
                    data: contribute_years_data,
                    backgroundColor: "rgb(75, 192, 192)",
                    borderColor: 'rgba(54, 162, 235, 0.5)',
                    tension: .1
                }]
            }
            DashboardController.contribution_year_chart.data = data_chart
            DashboardController.contribution_year_chart.update()
        },
        RenderExceptionCommentChart(article_without_comment_quantity, article_not_comment_after_14_day_quantity){
            const data_chart = {
                labels: ['Contributions without a comment', 'Contributions without a comment after 14 days'],
                datasets: [{
                    label: "Contribution",
                    data: [article_without_comment_quantity, article_not_comment_after_14_day_quantity],
                    backgroundColor: [
                        'rgb(0, 128, 0, .2)',
                        'rgb(255, 0, 0, .2)'
                    ],
                    borderColor: [
                        'rgba(0, 128, 0)',
                        'rgba(255, 0, 0)'
                    ]
                }]
            }
            DashboardController.exception_comment_chart.data = data_chart
            DashboardController.exception_comment_chart.update()
        },
        RenderContributeContributorChart(statistical_contributor){
            console.log(statistical_contributor)
            const labels = []
            const data = []
            statistical_contributor.map(faculty => {
                labels.push(faculty.name)
                data.push(faculty.contributors)
            })
            const data_chart = {
                labels,
                datasets: [{
                    label: "Contributors",
                    data,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                        'rgb(54, 162, 235)',
                    ]
                }]
            }
            DashboardController.contributor_chart.data = data_chart
            DashboardController.contributor_chart.update()
        },
        GetStatisticalContributionFaculties(magazine_id) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `/admin/dashboard/statistical-contribution-faculties/${magazine_id}`,
                    type: 'GET',
                    success: function (response) {
                        resolve(response)
                    },
                    error: function (error) {
                        reject(error)
                    }
                })
            });
        },
        GetStatisticalContributeYears(faculty_id) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `/admin/dashboard/statistical-contribution-years/${faculty_id}`,
                    type: 'GET',
                    success: function (response) {
                        resolve(response)
                    },
                    error: function (error) {
                        reject(error)
                    }
                })
            });
        },
        GetStatisticalExceptionComment(magazine_id){
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `/admin/dashboard/statistical-exception-comment/${magazine_id}`,
                    type: 'GET',
                    success: function (response) {
                        resolve(response)
                    },
                    error: function (error) {
                        reject(error)
                    }
                })
            });
        },
        GetStatisticalContributor(magazine_id){
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `/admin/dashboard/statistical-contributor/${magazine_id}`,
                    type: 'GET',
                    success: function (response) {
                        resolve(response)
                    },
                    error: function (error) {
                        reject(error)
                    }
                })
            });
            
        },
        GetFirstStatistical() {
            Loading(true)
            const contribute_of_faculty = DashboardController.GetStatisticalContributionFaculties('all')
            const contribute_of_years = DashboardController.GetStatisticalContributeYears('all')
            const exception_comment = DashboardController.GetStatisticalExceptionComment('all')
            const contributor = DashboardController.GetStatisticalContributor('all')
            Promise.all([contribute_of_faculty, contribute_of_years, exception_comment, contributor])
                .then((results) => {
                    setTimeout(() => {
                        const {statistical_contribute_faculty_data} = results[0]
                        DashboardController.RenderContributeFacultyAndPercentageChart(statistical_contribute_faculty_data)

                        const {statistical_Contribute_year_data} = results[1]
                        DashboardController.RenderContributeYearChart(statistical_Contribute_year_data)

                        const {article_without_comment_quantity, article_not_comment_after_14_day_quantity} = results[2]
                        DashboardController.RenderExceptionCommentChart(
                            article_without_comment_quantity,
                            article_not_comment_after_14_day_quantity
                        )

                        const {statistical_contributor} = results[3]
                        DashboardController.RenderContributeContributorChart(statistical_contributor)

                        Loading(false)
                    }, 1500)

                })
                .catch((error) => {
                    console.log(error)
                    Alert.Show('danger', 'something went wrong')
                    Loading(false)
                });
        },
        Run() {
            DashboardController.SetUpChart()
            DashboardController.EventListener()
            DashboardController.GetFirstStatistical()
        }
    }

    DashboardController.Run()


    // $.ajax({
    //     url: '/admin/dashboard/chart',
    //     type: 'get',
    //     beforeSend: LoadingWrapper(true),
    //     success: function (response) {
    //         setTimeout(() => {
    //             if (response.code === 200) {
    //                 console.log(response)
    //                 let best_sale_products_labels = []
    //                 let best_sale_products_data = []
    //                 response.best_sale_products.map((product) => {
    //                     best_sale_products_labels.push(product.name)
    //                     best_sale_products_data.push(product.quantity)
    //                 })
    //                 best_sale_product_chart.data = {
    //                     labels: best_sale_products_labels,
    //                     datasets: [{
    //                         label: 'Quantity',
    //                         backgroundColor: [
    //                             "rgba(235, 22, 22, .7)",
    //                             "rgba(235, 22, 22, .6)",
    //                             "rgba(235, 22, 22, .5)",
    //                             "rgba(235, 22, 22, .4)",
    //                             "rgba(235, 22, 22, .3)"
    //                         ],
    //                         data: best_sale_products_data
    //                     }]
    //                 }
    //
    //                 let traffic_web_labels = []
    //                 let traffic_web_data = []
    //                 response.traffic_web_report.map(traffic => {
    //                     traffic_web_labels.push(traffic.hour_access + 'h')
    //                     traffic_web_data.push(traffic.quantity_access)
    //                 })
    //
    //                 traffic_web_chart.data = {
    //                     labels: traffic_web_labels,
    //                     datasets: [{
    //                         label: "Customer Access Website",
    //                         data: traffic_web_data,
    //                         backgroundColor: "rgba(235, 22, 22, .7)",
    //                         fill: true
    //                     }]
    //                 }
    //
    //                 best_sale_product_chart.update()
    //                 traffic_web_chart.update()
    //             }
    //             LoadingWrapper(false)
    //         }, 1000)
    //     },
    //     error: function () {
    //         LoadingWrapper(false)
    //     }
    // })
})