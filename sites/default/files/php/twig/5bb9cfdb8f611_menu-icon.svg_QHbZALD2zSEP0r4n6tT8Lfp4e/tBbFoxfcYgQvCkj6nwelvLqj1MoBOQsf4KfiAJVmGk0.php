<?php

/* core/profiles/demo_umami/themes/umami/images/svg/menu-icon.svg */
class __TwigTemplate_05dff5c277b03987d0b0148c01013d89cd8fcc528633701c2fc63c91a7f30593 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $tags = array();
        $filters = array();
        $functions = array();

        try {
            $this->env->getExtension('Twig_Extension_Sandbox')->checkSecurity(
                array(),
                array(),
                array()
            );
        } catch (Twig_Sandbox_SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof Twig_Sandbox_SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

        // line 1
        echo "<svg width=\"23\" height=\"23\" viewBox=\"0 0 23 23\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-labelledby=\"menu-toggle-title menu-toggle-desc\"><title id=\"menu-toggle-title\">Menu toggle icon</title><desc id=\"menu-toggle-desc\">Hamburger icon for menu toggle.</desc><use xlink:href=\"#a\" fill=\"#5F635D\"/><use xlink:href=\"#a\" transform=\"translate(0 18)\" fill=\"#5F635D\"/><use xlink:href=\"#a\" transform=\"translate(0 9)\" fill=\"#5F635D\"/><defs><path id=\"a\" fill-rule=\"evenodd\" d=\"M0 0h23v5H0V0z\"/></defs></svg>
";
    }

    public function getTemplateName()
    {
        return "core/profiles/demo_umami/themes/umami/images/svg/menu-icon.svg";
    }

    public function getDebugInfo()
    {
        return array (  43 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "core/profiles/demo_umami/themes/umami/images/svg/menu-icon.svg", "/var/www/html/core/profiles/demo_umami/themes/umami/images/svg/menu-icon.svg");
    }
}
