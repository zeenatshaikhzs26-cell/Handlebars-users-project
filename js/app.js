// Helper to check equality (used to detect admin role)
Handlebars.registerHelper("eq", function (a, b) {
    return a === b;
});

async function init() {
    try {
        const res = await fetch("users.json");
        const users = await res.json();

        // Handlebars template
        const templateSource = `
            {{#each users}}
                <div class="p-4 mb-3 bg-white rounded shadow-sm">

                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-semibold">{{name}}</h3>

                        {{#if (eq role "admin")}}
                            <span class="px-2 py-1 text-sm rounded bg-red-100 text-red-700">
                                ADMIN
                            </span>
                        {{/if}}
                    </div>

                    <p class="text-gray-600 text-sm">{{email}}</p>
                </div>
            {{/each}}
        `;

        const template = Handlebars.compile(templateSource);
        const html = template({ users });

        document.getElementById("users-container").innerHTML = html;

    } catch (error) {
        document.getElementById("users-container").innerHTML =
            "<p class='text-red-500'>Error loading users.</p>";
        console.error(error);
    }
}

init();
