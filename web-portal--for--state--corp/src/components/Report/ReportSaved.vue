<template>
    <main>
        <header class="d-flex justify-content-center">
            <h1 class="text-center col-9" v-t="'report.title'"></h1>
        </header>
        <section>
            <b-row>
                <h2 v-t="'report.saveReport'"></h2>
                <fieldset style="width: 100%;">
                    <table class="def-params ft report-table">
                        <tbody>
                            <tr v-for="(r, r_id) in $store.state.report" :key="r_id">
                                <td>{{r.text}}</td>
                                <td>{{r.value}}</td>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>
            </b-row>
        </section>
    </main>
</template>

<style>
    .report-table {
        width: 100%;
    }
    .def-params {
        font-family: 'trebuchet MS', 'Lucida sans', Arial;
        height: 310px;
    }
    .ft {
        border: solid 1px rgb(121, 121, 121);
        background-color: rgba(250,250,250,0.6);
    }
    .report-table td {
        border: 1px solid black;
        font-size: 1.1em;
        padding: 20px;
    }
        .report-table td:first-child {
            font-weight: 800;
        }
        .report-table td:last-child {
            width: 60%;
            background: rgba(255, 255, 255, .5);
            font-style: italic;
        }  
</style>

