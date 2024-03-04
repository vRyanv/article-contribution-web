$(document).ready(function () {
    // Chart Global Color
    Chart.defaults.color = "#6C7293";
    Chart.defaults.borderColor = "#000000";

    const ctx_article = $("#article_chart").get(0).getContext("2d");
    const article_chart = new Chart(ctx_article, {
        type: "bar",
        data: {
            labels: ["IT", "Marting", "Design", "AI"],
            datasets: [{
                label: "Article",
                data: [15, 30, 55, 65],
                backgroundColor: "#FF7900"
            }]
        },
        options: {
            responsive: true
        }
    });

    var ctx_contribution = $("#contribution_chart").get(0).getContext("2d");
    var contribution_chart = new Chart(ctx_contribution, {
        type: "line",
        data: {
            labels: ["2019-2025", "2025-2026", "2016-2027", "2027-2028"],
            datasets: [{
                label: "Contribution",
                data: [15, 30, 55, 65],
                backgroundColor: "#FF7900"
            }]
        },
        options: {
            responsive: true
        }
    });

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